import VerifyAccount from '@/components/auths/verify-account'
import React, { Suspense } from 'react'
import prisma from '@/app/lib/prisma';

const fetchUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return { error: 'User not found' };
  }
  return { user };
}

interface VerifyAccountOtpProps {
  searchParams: { id: string }
}

export default async function VerifyAccountOtp({ searchParams }: VerifyAccountOtpProps) {
  const result = await fetchUser(searchParams.id);
  if ('error' in result) {
    return <div>Error: {result.error}</div>;
  }
  const { user } = result;
  const data = {
    email: user.email ?? '',
    id: user.id,
  }

  return (
    <Suspense fallback={<div className='text-center text-2xl font-medium my-10'>Loading...</div>}>
      <VerifyAccount data={data} />
    </Suspense>
  )
}
