'use client';
import { SignInForm } from '@/components/SignInForm';
import { useSearchParams } from 'next/navigation';
import { Container } from '@mui/material';
import { Suspense } from 'react';

function SignInContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <SignInForm message={message} />
    </Container>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
