'use client';

import { useEffect } from 'react';
import { useGlobalContext } from '@/Context/store';
import Link from 'next/link';

export default function Test() {
  const { userId, setUserId, data, setData, name } = useGlobalContext();

  useEffect(() => {
    setUserId('2');
    setData([
      { firstName: 'Tim' }, 
      { firstName: 'Kyle' }, 
      { firstName: 'Michael' }
    ]);
  }, [])

  return (
    <div>
      <Link href='/pages'>link pages</Link>
      <p>{userId}</p>
      <p>List:</p>
      <p>{name}</p>
      {data.map((e, i) => <p key={i}>{e.firstName}</p>)}
    </div>
  )
}
