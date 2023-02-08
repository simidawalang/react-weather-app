import React, { ChangeEventHandler, KeyboardEventHandler } from "react";

interface InputProps {
  className?: string;
  placeholder?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  icon?: any;
  alt?: string;
  onClickIcon?: any;
}

const Input = ({
  className,
  placeholder,
  value,
  onChange,
  onKeyUp,
  icon,
  alt,
  onClickIcon,
}: InputProps) => {
  return (
    <div className={`input ${className}`}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      {icon && (
        <img
          src={icon}
          alt={alt}
          width={18}
          height={18}
          onClick={onClickIcon}
        />
      )}
    </div>
  );
};

export default Input;
