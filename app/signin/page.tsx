"use client";

import { useEffect } from "react";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function SignUp() {

  useEffect(()=> {
    redirect('/dashboard/home');
  })
  
  return (
   <></>
  );
}
