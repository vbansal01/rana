import { Suspense } from "react";
import Image from "next/image";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4 bg-surface">
      <div className="w-full max-w-md">
        <div className="rounded-card bg-background border border-border shadow-card p-8">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="https://rana.org/wp-content/uploads/2025/10/Rana_logo.jpg"
                alt="RANA"
                width={120}
                height={48}
                className="h-16 w-auto object-contain"
              />
            </div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Member Portal
            </h1>
            <p className="text-sm text-muted mt-1">
              Sign in to access your RANA membership
            </p>
          </div>

          {/* Suspense required because LoginForm uses useSearchParams() */}
          <Suspense fallback={<div className="h-48 animate-pulse bg-surface rounded-md" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-muted mt-5">
          Having trouble?{" "}
          <a href="/contact" className="text-accent hover:underline">Contact us</a>
        </p>
      </div>
    </div>
  );
}
