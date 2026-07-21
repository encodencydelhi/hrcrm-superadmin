import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface SubscriptionPlanState {
  id: string | null;
  // Plan Details (Step 1)
  name: string;
  planCode: string;
  description: string;
  tier: string;
  targetAudience: string[];
  planBadge: string;
  displayOrder: number;
  isActive: boolean;

  // Features & Limits (Step 2)
  features: string[]; // List of core features included
  // Optional limits can be added here (maxUsers, maxCompanies, etc.) if they need to be configurable in UI later
  maxUsers: number;
  maxCompanies: number;
  maxBranches: number;
  maxDepartments: number;
  maxDesignations: number;

  // Add-on Modules (Step 3) - For now, we will store them as strings in the features array or as a separate array if needed
  addOnModules: string[];

  // Billing & Pricing (Step 4)
  priceINR: number;
  priceUSD: number;
  pricePerUserMonthlyINR: number;
  pricePerUserMonthlyUSD: number;
  pricePerUserYearlyINR: number;
  pricePerUserYearlyUSD: number;
  setupFeeINR: number;
  setupFeeUSD: number;
  freeAiCredits: number;
  aiCreditTopUpPriceINR: number;
  aiCreditTopUpPriceUSD: number;

  // Methods
  update: (patch: Partial<SubscriptionPlanState>) => void;
  toggleTargetAudience: (audience: string) => void;
  toggleFeature: (featureId: string) => void;
  toggleAddOnModule: (moduleId: string) => void;
  reset: () => void;
}

const initialState = {
  id: null,
  // Step 1
  name: '',
  planCode: '',
  description: '',
  tier: 'Starter', // Starter, Professional, Enterprise, Custom
  targetAudience: [] as string[],
  planBadge: 'Most Popular',
  displayOrder: 1,
  isActive: true,

  // Step 2
  features: [
    'employee-mgmt',
    'attendance-leave',
    'payroll',
    'ats',
    'pms',
    'reports'
  ] as string[],
  maxUsers: 100, // Default values
  maxCompanies: 1,
  maxBranches: 1,
  maxDepartments: 5,
  maxDesignations: 10,

  // Step 3
  addOnModules: [] as string[],

  // Step 4
  priceINR: 0,
  priceUSD: 0,
  pricePerUserMonthlyINR: 0,
  pricePerUserMonthlyUSD: 0,
  pricePerUserYearlyINR: 0,
  pricePerUserYearlyUSD: 0,
  setupFeeINR: 0,
  setupFeeUSD: 0,
  freeAiCredits: 0,
  aiCreditTopUpPriceINR: 0,
  aiCreditTopUpPriceUSD: 0,
};

export const useSubscriptionPlanStore = create<SubscriptionPlanState>()(
  persist(
    (set) => ({
      ...initialState,
      update: (patch) => set(patch),
      toggleTargetAudience: (audience) => set((s) => ({
        targetAudience: s.targetAudience.includes(audience)
          ? s.targetAudience.filter((a) => a !== audience)
          : [...s.targetAudience, audience]
      })),
      toggleFeature: (featureId) => set((s) => ({
        features: s.features.includes(featureId)
          ? s.features.filter((f) => f !== featureId)
          : [...s.features, featureId]
      })),
      toggleAddOnModule: (moduleId) => set((s) => ({
        addOnModules: s.addOnModules.includes(moduleId)
          ? s.addOnModules.filter((m) => m !== moduleId)
          : [...s.addOnModules, moduleId]
      })),
      reset: () => set(initialState),
    }),
    {
      name: 'subscription-plan-draft',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
