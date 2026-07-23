"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { authClient } from "@/services/auth.client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      await authClient.login(
        username,
        password
      );

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Admin Login
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="username">
              Username
            </Label>

            <Input
              id="username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                className="pr-10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>


          <Button
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}