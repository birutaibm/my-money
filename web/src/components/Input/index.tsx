import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<Props> = ({ name, icon: Icon, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setFocused] = useState(false);
  const [isFilled, setFilled] = useState(() =>
    inputRef.current ? inputRef.current.value !== '' : false,
  );
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => {
    setFilled(inputRef.current ? inputRef.current.value !== '' : false);
    setFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} hasError={!!error}>
      {Icon && <Icon size={20} />}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name={name}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
