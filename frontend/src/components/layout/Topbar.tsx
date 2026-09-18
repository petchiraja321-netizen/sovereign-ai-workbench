import {
  Bell,
  ChevronRight,
  Command,
  HelpCircle,
  Search,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { StatusBadge } from "../ui/StatusBadge";

import type { Notification } from "../../types/notification";
import { getNotifications } from "../../api/notifications";

import { GlobalSearch } from "../GlobalSearch/GlobalSearch";

import "./topbar.css";

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/ai-studio": "AI Studio",
  "/knowledge": "Knowledge Base",
  "/tasks": "Tasks",
  "/security": "Security",
  "/audit": "Audit",
  "/deliverables": "Deliverables",
  "/approvals": "Approvals",
  "/notifications": "Notifications",
  "/settings": "Settings",
};

function getNotificationRoute(
  notification: Notification,
) {
  switch (notification.resourceType) {
    case "TASK":
      return "/tasks";

    case "APPROVAL":
      return "/approvals";

    case "SECURITY":
      return "/security";

    case "DELIVERABLE":
      return "/deliverables";

    case "SETTINGS":
      return "/settings";

    default:
      return "/notifications";
  }
}

function getNotificationIcon(
  type: Notification["type"],
) {
  switch (type) {
    case "APPROVAL":
      return "!";

    case "SECURITY":
      return "⚠";

    case "DELIVERABLE":
      return "✓";

    case "TASK":
      return "▣";

    case "AGENT":
      return "◆";

    case "SYSTEM":
      return "⚙";

    default:
      return "•";
  }
}

export function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const notificationRef =
    useRef<HTMLDivElement | null>(null);

  const currentPage =
    pageNames[location.pathname] ??
    "Workbench";

  useEffect(() => {
    let mounted = true;

    async function loadNotifications() {
      try {
        const data =
          await getNotifications();

        if (mounted) {
          setNotifications(data);
        }
      } catch {
        if (mounted) {
          setNotifications([]);
        }
      }
    }

    loadNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleGlobalShortcut = (
      event: KeyboardEvent,
    ) => {
      const isMac =
        navigator.platform
          .toLowerCase()
          .includes("mac");

      const modifierPressed = isMac
        ? event.metaKey
        : event.ctrlKey;

      if (
        modifierPressed &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
        setNotificationOpen(false);
      }

      if (
        event.key === "Escape" &&
        searchOpen
      ) {
        event.preventDefault();
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleGlobalShortcut,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleGlobalShortcut,
      );
    };
  }, [searchOpen]);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node,
        )
      ) {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick,
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, [notificationOpen]);

  const unreadNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.read,
      ),
    [notifications],
  );

  const recentNotifications =
    notifications.slice(0, 4);

  const handleNotificationClick = (
    notification: Notification,
  ) => {
    setNotificationOpen(false);

    navigate(
      getNotificationRoute(
        notification,
      ),
    );
  };

  const handleViewAll = () => {
    setNotificationOpen(false);
    navigate("/notifications");
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setNotificationOpen(false);
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar__left">
          <div className="topbar__breadcrumb">
            <span className="topbar__breadcrumb-muted">
              Workbench
            </span>

            <ChevronRight size={13} />

            <span className="topbar__breadcrumb-current">
              {currentPage}
            </span>
          </div>
        </div>

        <div className="topbar__right">
          <button
            type="button"
            className="topbar__search"
            onClick={handleSearchOpen}
            aria-label="Open global search"
          >
            <Search size={15} />

            <span>
              Search
            </span>

            <kbd>
              <Command size={10} />
              K
            </kbd>
          </button>

          <StatusBadge
            status="online"
            label="System Online"
          />

          <button
            type="button"
            className="topbar__icon-button"
            aria-label="Help"
          >
            <HelpCircle size={17} />
          </button>

          <div
            className="topbar__notification-wrapper"
            ref={notificationRef}
          >
            <button
              type="button"
              className={`topbar__icon-button topbar__notification ${
                notificationOpen
                  ? "topbar__notification--active"
                  : ""
              }`}
              aria-label={`Notifications${
                unreadNotifications.length >
                0
                  ? `, ${unreadNotifications.length} unread`
                  : ""
              }`}
              aria-expanded={
                notificationOpen
              }
              onClick={() =>
                setNotificationOpen(
                  (current) =>
                    !current,
                )
              }
            >
              <Bell size={17} />

              {unreadNotifications.length >
                0 && (
                <span className="topbar__notification-badge">
                  {unreadNotifications.length >
                  9
                    ? "9+"
                    : unreadNotifications.length}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-dropdown__header">
                  <div>
                    <span className="notification-dropdown__eyebrow">
                      WORKBENCH
                    </span>

                    <h3>
                      Notifications
                    </h3>
                  </div>

                  {unreadNotifications.length >
                    0 && (
                    <span className="notification-dropdown__count">
                      {
                        unreadNotifications.length
                      }{" "}
                      unread
                    </span>
                  )}
                </div>

                <div className="notification-dropdown__list">
                  {recentNotifications.length ===
                  0 ? (
                    <div className="notification-dropdown__empty">
                      <span>✓</span>
                      <p>
                        No notifications
                      </p>
                    </div>
                  ) : (
                    recentNotifications.map(
                      (
                        notification,
                      ) => (
                        <button
                          type="button"
                          key={
                            notification.id
                          }
                          className={`notification-dropdown__item ${
                            notification.read
                              ? ""
                              : "notification-dropdown__item--unread"
                          }`}
                          onClick={() =>
                            handleNotificationClick(
                              notification,
                            )
                          }
                        >
                          <span
                            className={`notification-dropdown__icon notification-dropdown__icon--${notification.severity.toLowerCase()}`}
                          >
                            {getNotificationIcon(
                              notification.type,
                            )}
                          </span>

                          <span className="notification-dropdown__content">
                            <span className="notification-dropdown__title-row">
                              {!notification.read && (
                                <span className="notification-dropdown__unread-dot" />
                              )}

                              <strong>
                                {
                                  notification.title
                                }
                              </strong>
                            </span>

                            <span className="notification-dropdown__message">
                              {
                                notification.message
                              }
                            </span>

                            <span className="notification-dropdown__time">
                              {
                                notification.timestamp
                              }
                            </span>
                          </span>
                        </button>
                      ),
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="notification-dropdown__footer"
                  onClick={
                    handleViewAll
                  }
                >
                  <span>
                    View all notifications
                  </span>

                  <ChevronRight
                    size={14}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <GlobalSearch
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />
    </>
  );
}