import styles from './Input.module.css';

export interface InputProps {
  autoFocus?: boolean;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date';
  max?: string | number;
  min?: string | number;
}

export const Input = ({label, placeholder, value, onChange, autoFocus=false, type='text', max, min}: InputProps) => {
  return (
    <div className={styles.container}>
      <label
        className={styles.label}
        htmlFor={label}
      >{label}</label>
      <input
        className={styles.input}
        id={label}
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        autoComplete='off'
        type={type}
        max={max}
        min={min}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
