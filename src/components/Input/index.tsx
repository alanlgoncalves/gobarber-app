import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { useField } from '@unform/core';

import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface InputValueRederence {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest }: InputProps,
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueRederence>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue({ value }) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}
    >
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
