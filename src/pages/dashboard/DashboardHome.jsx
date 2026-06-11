import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  Megaphone,
  Search,
  Sparkles,
  Trophy,
  Users,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

function MetricCard({ label, value, helper, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-[#667085]">{label}</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-[#101828]">{value}</p>
          <p className="mt-1 text-xs text-[#98A2B3]">{helper}</p>
        </div>

        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2F0FD1]">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CategoryPill({ active, label, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
        active
          ? "border-[#2F0FD1] bg-[#EEF2FF] text-[#2F0FD1]"
          : "border-[#EAECF0] bg-white text-[#667085] hover:border-[#D6D9E6] hover:text-[#101828]"
      }`}
    >
      {label}
      {count ? (
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            active ? "bg-white text-[#2F0FD1]" : "bg-[#F2F4F7] text-[#667085]"
          }`}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

function OpportunityCard({
  category,
  type,
  title,
  description,
  reward,
  meta,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-[#EAECF0] bg-white p-4 text-left shadow-sm transition hover:border-[#D6D9E6] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#2F0FD1]">
          <Icon className="h-5 w-5" />
        </div>

        <span className="rounded-full bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#667085]">
          {type}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-wide text-[#2F0FD1] uppercase">
          {category}
        </span>
        <span className="h-1 w-1 rounded-full bg-[#D0D5DD]" />
        <span className="text-xs text-[#98A2B3]">{meta}</span>
      </div>

      <h3 className="mt-2 text-sm font-semibold text-[#101828]">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-[#667085]">{description}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#F2F4F7] pt-3">
        <span className="text-sm font-semibold text-[#101828]">{reward}</span>

        <span className="inline-flex items-center gap-2 text-sm font-medium text-[#2F0FD1]">
          View
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

function StatusItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-3 rounded-xl bg-[#F8FAFC] px-3 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2F0FD1] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <p className="text-sm font-semibold text-[#101828]">{title}</p>
        <p className="mt-1 text-sm text-[#667085]">{description}</p>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");

  const [dashboardStats, setDashboardStats] = useState({
    openOpportunities: 0,
    activeContributors: 0,
    rewardsAvailableUsd: 0,
    completedWork: 0,
    openTasks: 0,
    activeQuests: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchDashboardStats() {
      try {
        setLoadingStats(true);

        const res = await fetch(`${API_URL}/api/stats/dashboard`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch dashboard stats.");
        }

        const stats = data.stats || {};

        if (mounted) {
          setDashboardStats({
            openOpportunities: Number(stats.openOpportunities || 0),
            activeContributors: Number(stats.activeContributors || 0),
            rewardsAvailableUsd: Number(stats.rewardsAvailableUsd || 0),
            completedWork: Number(stats.completedWork || 0),
            openTasks: Number(stats.openTasks || 0),
            activeQuests: Number(stats.activeQuests || 0),
          });
        }
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        if (mounted) {
          setLoadingStats(false);
        }
      }
    }

    fetchDashboardStats();

    return () => {
      mounted = false;
    };
  }, []);

  const metrics = [
    {
      label: "Open opportunities",
      value: loadingStats ? "--" : dashboardStats.openOpportunities.toLocaleString(),
      helper: "Across tasks, quests, and programs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Active contributors",
      value: loadingStats ? "--" : dashboardStats.activeContributors.toLocaleString(),
      helper: "Building contributor profiles",
      icon: Users,
    },
    {
      label: "Rewards available",
      value: loadingStats
        ? "--"
        : `$${dashboardStats.rewardsAvailableUsd.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
      helper: "Estimated reward pool",
      icon: WalletCards,
    },
    {
      label: "Completed work",
      value: loadingStats ? "--" : dashboardStats.completedWork.toLocaleString(),
      helper: "Approved contributions",
      icon: CheckCircle2,
    },
  ];

  const categories = [
    {
      label: "All",
      count: loadingStats ? "--" : dashboardStats.openOpportunities.toLocaleString(),
    },
    {
      label: "Build",
      count: loadingStats ? "--" : dashboardStats.openTasks.toLocaleString(),
    },
    {
      label: "Growth",
      count: loadingStats ? "--" : dashboardStats.activeQuests.toLocaleString(),
    },
    {
      label: "Community",
      count: "Soon",
    },
    {
      label: "Expertise",
      count: "Soon",
    },
  ];

  const opportunities = [
    {
      category: "Build",
      type: "Task",
      title: "Build products and integrations",
      description:
        "Ship features, fix issues, design interfaces, write documentation, or support technical delivery.",
      reward: "Open rewards",
      meta: "Technical work",
      icon: BriefcaseBusiness,
      route: "/quests?category=build",
    },
    {
      category: "Growth",
      type: "Quest",
      title: "Drive product adoption",
      description:
        "Create content, run campaigns, share product stories, and help projects reach the right users.",
      reward: "Campaign rewards",
      meta: "Content and reach",
      icon: Megaphone,
      route: "/quests?category=growth",
    },
    {
      category: "Community",
      type: "Program",
      title: "Support project communities",
      description:
        "Help with onboarding, moderation, events, user support, ambassador work, and community operations.",
      reward: "Coming soon",
      meta: "Community work",
      icon: Users,
      route: "/quests?category=community",
    },
    {
      category: "Expertise",
      type: "Review",
      title: "Contribute specialized insight",
      description:
        "Provide testing, research, audits, reviews, product feedback, and expert recommendations.",
      reward: "Coming soon",
      meta: "Research and review",
      icon: CheckCircle2,
      route: "/quests?category=expertise",
    },
  ];

  const filteredOpportunities = useMemo(() => {
    if (activeCategory === "All") {
      return opportunities;
    }

    return opportunities.filter((opportunity) => opportunity.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen">
      <div className="space-y-3 px-2 py-2">
        <section className="overflow-hidden rounded-3xl border border-[#EAECF0] bg-white shadow-sm">
          <div className="relative p-5 sm:p-6 lg:p-7">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[#EEF2FF] blur-3xl" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">
                  Discover opportunities. Complete contributions. Earn rewards.
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667085] sm:text-base">
                  Browse tasks, quests, hackathons, and contribution programs from projects across
                  the ecosystem.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/quests")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2F0FD1] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2409B8]"
              >
                Browse opportunities
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  helper={metric.helper}
                  icon={metric.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <section className="rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#101828]">Explore opportunities</h2>

                <p className="mt-1 text-sm text-[#667085]">
                  Browse by contribution type or jump into featured opportunities.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/opportunities")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#EAECF0] bg-white px-4 text-sm font-medium text-[#101828] transition hover:bg-[#F9FAFB]"
              >
                <Search className="h-4 w-4" />
                View all
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <CategoryPill
                  key={category.label}
                  label={category.label}
                  count={category.count}
                  active={activeCategory === category.label}
                  onClick={() => setActiveCategory(category.label)}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.title}
                category={opportunity.category}
                type={opportunity.type}
                title={opportunity.title}
                description={opportunity.description}
                reward={opportunity.reward}
                meta={opportunity.meta}
                icon={opportunity.icon}
                onClick={() => navigate(opportunity.route)}
              />
            ))}
          </section>
        </section>
        <section className="rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-[#101828]">How Contribute works</h2>
            <p className="text-sm text-[#667085]">
              Move from discovery to verified contribution, reputation, and rewards.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatusItem
              icon={Compass}
              title="Discover"
              description="Browse tasks, quests, programs, and challenges from active projects."
            />

            <StatusItem
              icon={CheckCircle2}
              title="Contribute"
              description="Apply, complete work, submit entries, or participate in opportunities."
            />

            <StatusItem
              icon={Trophy}
              title="Build reputation"
              description="Grow a trusted profile through verified contributions."
            />

            <StatusItem
              icon={WalletCards}
              title="Earn"
              description="Receive rewards when your work is approved or selected."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
