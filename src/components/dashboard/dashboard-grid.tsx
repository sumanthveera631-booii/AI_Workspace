"use client";

import GridLayout from "react-grid-layout";
import { useMobile } from "@/hooks/use-mobile";
import AnalyticsWidget from "./analytics-widget";
import AIWidget from "./ai-widget";
import CalendarWidget from "./calendar-widget";
import TaskWidget from "./task-widget";
import KnowledgeWidget from "./knowledge-widget";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
}

interface Document {
  id: string;
  title: string;
  status: string;
  emoji: string | null;
}

interface Activity {
  id: string;
  action: string;
  created_at: string;
  user: { name: string } | null;
}

interface DashboardGridProps {
  initialTasks: Task[];
  initialDocuments: Document[];
  initialActivities: Activity[];
}

export default function DashboardGrid({
  initialTasks,
  initialDocuments,
  initialActivities,
}: DashboardGridProps) {
  const isMobile = useMobile();

  const layout = [
    {
      i: "analytics",
      x: 0,
      y: 0,
      w: isMobile ? 1 : 4,
      h: 5,
    },

    {
      i: "ai",
      x: isMobile ? 0 : 4,
      y: isMobile ? 5 : 0,
      w: isMobile ? 1 : 4,
      h: 5,
    },

    {
      i: "calendar",
      x: isMobile ? 0 : 8,
      y: isMobile ? 10 : 0,
      w: isMobile ? 1 : 4,
      h: 5,
    },

    {
      i: "tasks",
      x: isMobile ? 0 : 0,
      y: isMobile ? 15 : 5,
      w: isMobile ? 1 : 6,
      h: 5,
    },

    {
      i: "knowledge",
      x: isMobile ? 0 : 6,
      y: isMobile ? 20 : 5,
      w: isMobile ? 1 : 6,
      h: 5,
    },
  ];

  return (
    <div className="w-full overflow-hidden p-4 md:p-8">
      <div className="mx-auto max-w-[1600px]">
        <GridLayout
          className="layout"
          layout={layout}
          cols={isMobile ? 1 : 12}
          width={isMobile ? 360 : 1400}
          rowHeight={100}
          isResizable
          isDraggable
          margin={[24, 24]}
          containerPadding={[0, 0]}
        >
          <div key="analytics">
            <AnalyticsWidget />
          </div>

          <div key="ai">
            <AIWidget />
          </div>

          <div key="calendar">
            <CalendarWidget />
          </div>

          <div key="tasks">
            <TaskWidget initialTasks={initialTasks} />
          </div>

          <div key="knowledge">
            <KnowledgeWidget initialDocuments={initialDocuments} />
          </div>
        </GridLayout>
      </div>
    </div>
  );
}