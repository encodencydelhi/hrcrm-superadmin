interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
}

const PageHeader = ({
  title,
  description = "Crewcam HRMS Control Center",
}: PageHeaderProps) => {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
};
export default PageHeader