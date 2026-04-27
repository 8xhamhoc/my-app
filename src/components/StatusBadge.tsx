import React from "react"

type Props = {
    isOnline: boolean;
}

const StatusBadge: React.FC<Props> = ({isOnline}) => {
    return (
        <span style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "500",
          backgroundColor: isOnline ? "#e1f5ee" : "#f5f5f5",
          color: isOnline ? "#085041" : "#666",
        }}>
          {isOnline ? "🟢 Online" : "⚫ Offline"}
        </span>
      );
};

export default StatusBadge;
