import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getNotificationStats,
  getNotifications,
  getSystemEvents,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../api/notifications";

import type {
  Notification,
  NotificationFilters,
  NotificationStats as NotificationStatsType,
  SystemEvent,
} from "../../types/notification";

import { NotificationHeader } from "./components/NotificationHeader";
import { NotificationStats } from "./components/NotificationStats";
import { NotificationToolbar } from "./components/NotificationToolbar";
import { NotificationList } from "./components/NotificationList";
import { NotificationDetails } from "./components/NotificationDetails";
import { SystemEventPanel } from "./components/SystemEventPanel";

import "./notifications.css";

const initialFilters: NotificationFilters = {
  search: "",
  type: "ALL",
  severity: "ALL",
  status: "ALL",
};

const initialStats: NotificationStatsType = {
  total: 0,
  unread: 0,
  alerts: 0,
  systemEvents: 0,
};

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [systemEvents, setSystemEvents] =
    useState<SystemEvent[]>([]);

  const [stats, setStats] =
    useState<NotificationStatsType>(
      initialStats,
    );

  const [filters, setFilters] =
    useState<NotificationFilters>(
      initialFilters,
    );

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadNotifications() {
      setLoading(true);
      setError(null);

      try {
        const [
          notificationData,
          statsData,
          systemEventData,
        ] = await Promise.all([
          getNotifications(),
          getNotificationStats(),
          getSystemEvents(),
        ]);

        if (!mounted) {
          return;
        }

        setNotifications(notificationData);
        setStats(statsData);
        setSystemEvents(systemEventData);
      } catch {
        if (mounted) {
          setError(
            "Unable to load notifications.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredNotifications = useMemo(() => {
    const query = filters.search
      .trim()
      .toLowerCase();

    return notifications.filter(
      (notification) => {
        const matchesSearch =
          !query ||
          notification.id
            .toLowerCase()
            .includes(query) ||
          notification.title
            .toLowerCase()
            .includes(query) ||
          notification.message
            .toLowerCase()
            .includes(query) ||
          notification.resourceId
            ?.toLowerCase()
            .includes(query);

        const matchesType =
          filters.type === "ALL" ||
          notification.type ===
            filters.type;

        const matchesSeverity =
          filters.severity === "ALL" ||
          notification.severity ===
            filters.severity;

        const matchesStatus =
          filters.status === "ALL" ||
          (filters.status === "READ" &&
            notification.read) ||
          (filters.status === "UNREAD" &&
            !notification.read);

        return (
          matchesSearch &&
          matchesType &&
          matchesSeverity &&
          matchesStatus
        );
      },
    );
  }, [notifications, filters]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const handleSelectNotification = (
    notification: Notification,
  ) => {
    setSelectedNotification(
      notification,
    );

    if (!notification.read) {
      void handleMarkRead(notification);
    }
  };

  const handleMarkRead = async (
    notification: Notification,
  ) => {
    try {
      const updated =
        await markNotificationAsRead(
          notification.id,
        );

      if (!updated) {
        return;
      }

      setNotifications((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );

      setSelectedNotification(
        (current) =>
          current?.id === updated.id
            ? updated
            : current,
      );

      setStats((current) => ({
        ...current,
        unread: Math.max(
          0,
          current.unread - 1,
        ),
      }));
    } catch {
      setError(
        "Unable to mark notification as read.",
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const updated =
        await markAllNotificationsAsRead();

      setNotifications(updated);

      setSelectedNotification(
        (current) => {
          if (!current) {
            return null;
          }

          return {
            ...current,
            read: true,
          };
        },
      );

      setStats((current) => ({
        ...current,
        unread: 0,
      }));
    } catch {
      setError(
        "Unable to mark all notifications as read.",
      );
    }
  };

  return (
    <div className="notification-page">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={
          handleMarkAllRead
        }
      />

      <NotificationStats
        stats={stats}
      />

      <NotificationToolbar
        filters={filters}
        onChange={setFilters}
      />

      {error && (
        <div
          className="notification-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="notification-loading">
          Loading notifications...
        </div>
      ) : (
        <div className="notification-content-grid">
          <NotificationList
            notifications={
              filteredNotifications
            }
            onSelect={
              handleSelectNotification
            }
            onMarkRead={
              handleMarkRead
            }
          />

          <SystemEventPanel
            events={systemEvents}
          />
        </div>
      )}

      {selectedNotification && (
        <NotificationDetails
          notification={
            selectedNotification
          }
          onClose={() =>
            setSelectedNotification(
              null,
            )
          }
          onMarkRead={
            handleMarkRead
          }
        />
      )}
    </div>
  );
}