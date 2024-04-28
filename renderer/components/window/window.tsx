"use client";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
};

const WindowComponent = ({ title, children, onClose }: WindowProps) => {
  return (
    <div className="window active">
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          {onClose && <button aria-label="Close" onClick={onClose}></button>}
        </div>
      </div>
      <div
        className="window-body has-space"
        style={{ height: "calc(100svh - 35px)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default WindowComponent;
