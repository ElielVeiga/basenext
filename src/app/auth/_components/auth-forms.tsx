'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {signIn} from "next-auth/react"
import { toast } from "@/hooks/use-toast";

export default function AuthForm() {
    const form = useForm()

    const handleSubmit = form.handleSubmit(async(data) => {
       try {
        await signIn('email', {email: data.email, redirect:false})
        toast({
            title:'Magic Link Send',
            description:'Verifique seu email'
        })
       // eslint-disable-next-line @typescript-eslint/no-unused-vars
       } catch (error) {
        toast({
            title:'Error',
            description:'erro ao enviar email'
        })
       }
    })


    return (
      <div className="mx-auto max-w-sm space-y-8">
       <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">Digite o email para entrar</p>
       </div>
       <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="example@example.com" required type="email" {...form.register('email')}/>
            </div>
            <Button className="w-full" type="submit">
                Send Magic Link
            </Button>
       </form>
      </div>
    );
  }
  