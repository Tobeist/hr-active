import type { MockClass } from '@/lib/types';

interface Props {
  mockClass: MockClass;
  mockContent: string | null;
  className?: string;
}

export function ProductMock({ mockClass, mockContent, className = '' }: Props) {
  return (
    <div
      className={`product-mock ${mockClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: mockContent ?? '' }}
    />
  );
}
