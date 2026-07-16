import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface WizardPackage {
  _id: string;
  name: string;
  tier: string;
  features: string[];
  pricePerUserMonthlyINR: number;
  pricePerUserYearlyINR: number;
  setupFeeINR: number;
  freeAiCredits: number;
  maxUsers: number;
  aiCreditTopUpPriceINR: number;
}

interface CompanyWizardState {
  // Highest step number the user has unlocked by successfully submitting the step before it —
  // steps beyond this are not reachable, neither via the stepper nor via direct URL.
  maxStepReached: number;
  // Set when the wizard was opened via "Edit" on an existing company — review-confirm PUTs
  // to this tenant instead of POSTing a new one. Null means a normal create flow.
  editingTenantId: string | null;

  // Step 1 — Basic Information + Registered Address
  name: string;
  corporateId: string;
  tradeName: string;
  industry: string;
  companySize: string;
  gstin: string;
  panNumber: string;
  cin: string;
  website: string;
  email: string;
  phone: string;
  incorporationYear: string;
  baseCurrency: string;
  timezone: string;
  logoUrl: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;

  // Step 2 — Subscription & Plan
  selectedPackage: WizardPackage | null;
  billingCycle: 'MONTHLY' | 'YEARLY';
  addonModules: string[];
  estimatedEmployees: number;
  advancePayment: string;
  invoiceCurrency: string;
  gstTreatment: string;

  // Step 3 — Admin & Contact + Documents
  adminFullName: string;
  adminDesignation: string;
  adminEmail: string;
  adminPhone: string;
  alternateEmail: string;
  alternatePhone: string;
  whatsappNumber: string;
  preferredLanguage: string;
  supportEmail: string;
  supportPhone: string;
  linkedInUrl: string;
  description: string;
  incorporationCertUrl: string;
  gstCertUrl: string;
  panCardUrl: string;
  otherDocumentUrl: string;

  // Step 4 — System Configuration
  selectedModules: Record<string, boolean>;
  notificationPreferences: {
    biometric: boolean;
    sso: boolean;
    sms: boolean;
    geoTracking: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  weekStartsOn: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  leaveYearStartMonth: number;
  financialYearStartMonth: number;

  update: (patch: Partial<CompanyWizardState>) => void;
  toggleModule: (id: string) => void;
  toggleAddon: (id: string) => void;
  togglePreference: (key: keyof CompanyWizardState['notificationPreferences']) => void;
  unlockStep: (step: number) => void;
  loadFromExisting: (tenantId: string, data: any) => void;
  reset: () => void;
}

const DEFAULT_MODULES: Record<string, boolean> = {
  employee: true, attendance: true, leave: true, payroll: true,
  performance: true, recruitment: true, training: true, assets: true,
  documents: true, helpdesk: true, expense: false, mobile: true,
};

const initialState = {
  maxStepReached: 1,
  editingTenantId: null as string | null,

  name: '', corporateId: '', tradeName: '', industry: '', companySize: '',
  gstin: '', panNumber: '', cin: '', website: '', email: '', phone: '',
  incorporationYear: '', baseCurrency: 'INR (₹) - Indian Rupee', timezone: '(GMT+05:30) Asia/Kolkata',
  logoUrl: '', addressLine1: '', addressLine2: '', country: 'India', state: '', city: '', postalCode: '',

  selectedPackage: null as WizardPackage | null,
  billingCycle: 'MONTHLY' as 'MONTHLY' | 'YEARLY',
  addonModules: [] as string[],
  estimatedEmployees: 100,
  advancePayment: '1 Month',
  invoiceCurrency: 'INR (₹) - Indian Rupee',
  gstTreatment: 'Exclusive of GST',

  adminFullName: '', adminDesignation: '', adminEmail: '', adminPhone: '',
  alternateEmail: '', alternatePhone: '', whatsappNumber: '', preferredLanguage: 'English',
  supportEmail: '', supportPhone: '', linkedInUrl: '', description: '',
  incorporationCertUrl: '', gstCertUrl: '', panCardUrl: '', otherDocumentUrl: '',

  selectedModules: DEFAULT_MODULES,
  notificationPreferences: {
    biometric: true, sso: true, sms: false, geoTracking: true, email: true, whatsapp: true,
  },
  weekStartsOn: 'Monday', dateFormat: 'DD MMM YYYY', timeFormat: '12 Hours (01:30 PM)',
  numberFormat: '1,23,456.78', leaveYearStartMonth: 4, financialYearStartMonth: 4,
};

export const useCompanyWizardStore = create<CompanyWizardState>()(
  persist(
    (set) => ({
      ...initialState,
      update: (patch) => set(patch),
      toggleModule: (id) => set((s) => ({ selectedModules: { ...s.selectedModules, [id]: !s.selectedModules[id] } })),
      toggleAddon: (id) => set((s) => ({
        addonModules: s.addonModules.includes(id) ? s.addonModules.filter((a) => a !== id) : [...s.addonModules, id],
      })),
      togglePreference: (key) => set((s) => ({ notificationPreferences: { ...s.notificationPreferences, [key]: !s.notificationPreferences[key] } })),
      unlockStep: (step) => set((s) => ({ maxStepReached: Math.max(s.maxStepReached, step) })),
      loadFromExisting: (tenantId, data) => {
        const tenant = data || {};
        const company = data?.company || {};
        const admin = data?.admin || {};
        const pkg = tenant.packageId;
        set({
          ...initialState,
          editingTenantId: tenantId,
          maxStepReached: 5,

          name: tenant.name || '',
          corporateId: company.corporateId || '',
          tradeName: company.tradeName || '',
          industry: company.industry || '',
          companySize: company.companySize || '',
          gstin: company.gstin || '',
          panNumber: company.panNumber || '',
          cin: company.cin || '',
          website: company.website || '',
          email: company.email || '',
          phone: company.phone || '',
          incorporationYear: company.incorporationDate ? String(new Date(company.incorporationDate).getFullYear()) : '',
          baseCurrency: company.baseCurrency || initialState.baseCurrency,
          timezone: company.timezone || initialState.timezone,
          logoUrl: company.logoUrl || '',
          addressLine1: company.addressLine1 || '',
          addressLine2: company.addressLine2 || '',
          country: company.country || initialState.country,
          state: company.state || '',
          city: company.city || '',
          postalCode: company.postalCode || '',

          selectedPackage: pkg ? {
            _id: pkg._id, name: pkg.name, tier: pkg.tier, features: pkg.features || [],
            pricePerUserMonthlyINR: pkg.pricePerUserMonthlyINR || 0, pricePerUserYearlyINR: pkg.pricePerUserYearlyINR || 0,
            setupFeeINR: pkg.setupFeeINR || 0, freeAiCredits: pkg.freeAiCredits || 0,
            maxUsers: pkg.maxUsers || 0, aiCreditTopUpPriceINR: pkg.aiCreditTopUpPriceINR || 0,
          } : null,
          billingCycle: tenant.billingCycle || 'MONTHLY',
          addonModules: company.addonModules || [],
          estimatedEmployees: tenant.estimatedEmployees || initialState.estimatedEmployees,

          adminFullName: `${admin.firstName || ''} ${admin.lastName || ''}`.trim(),
          adminDesignation: admin.designation || '',
          adminEmail: admin.email || '',
          adminPhone: admin.mobileNumber || '',
          alternateEmail: company.alternateEmail || '',
          alternatePhone: company.alternatePhone || '',
          whatsappNumber: company.whatsappNumber || '',
          preferredLanguage: company.preferredLanguage || initialState.preferredLanguage,
          supportEmail: company.supportEmail || '',
          supportPhone: company.supportPhone || '',
          linkedInUrl: company.linkedInUrl || '',
          description: company.description || '',
          incorporationCertUrl: company.documents?.incorporationCertUrl || '',
          gstCertUrl: company.documents?.gstCertUrl || '',
          panCardUrl: company.documents?.panCardUrl || '',
          otherDocumentUrl: company.documents?.otherDocumentUrl || '',

          selectedModules: Object.fromEntries(
            Object.keys(DEFAULT_MODULES).map((id) => [id, Array.isArray(company.selectedModules) ? company.selectedModules.includes(id) : DEFAULT_MODULES[id]])
          ),
          notificationPreferences: company.notificationPreferences || initialState.notificationPreferences,
          weekStartsOn: company.weekStartsOn || initialState.weekStartsOn,
          dateFormat: company.dateFormat || initialState.dateFormat,
          timeFormat: company.timeFormat || initialState.timeFormat,
          numberFormat: company.numberFormat || initialState.numberFormat,
          leaveYearStartMonth: company.leaveYearStartMonth || initialState.leaveYearStartMonth,
          financialYearStartMonth: company.financialYearStartMonth || initialState.financialYearStartMonth,
        });
      },
      reset: () => set(initialState),
    }),
    {
      name: 'company-wizard-draft',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
