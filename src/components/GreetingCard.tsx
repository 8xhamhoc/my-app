
import React from "react"
import StatusBadge from "./StatusBadge";

type Props = {
    name: string;
    role: string;
    isOnline: boolean
}

const GreetingCard: React.FC<Props> = ({name, role, isOnline}) => {
    return (
        <div style={{
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          padding: "20px 24px",
          width: "280px",
          fontFamily: "sans-serif",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "18px" }}>
            Hello, {name}! 👋
          </h2>
          <p style={{ margin: "0 0 12px", color: "#888", fontSize: "14px" }}>
            {role}
          </p>
     
          <StatusBadge isOnline={isOnline} />
        </div>
      );
};

export default GreetingCard;
