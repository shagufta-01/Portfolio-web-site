import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 md:py-32">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-primary mb-2">Welcome to my portfolio</p>
                <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight">
                  Creative Designer & Developer
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I craft beautiful, functional digital experiences that solve real problems. With expertise in design and development, I help brands tell their stories through thoughtful, user-centered solutions.
              </p>

              <div className="space-y-4">
                <p className="text-sm font-medium text-foreground">Specializing in:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Web Design & Development
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    UI/UX Design
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    Brand Strategy
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <a>
                    <Button size="lg" className="w-full sm:w-auto">
                      Hire Me
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Work
                </Button>
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-sm">
                {/* Geometric shapes for visual interest */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/20 rounded-3xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-accent/30 to-secondary/20 rounded-3xl transform rotate-6 translate-x-4 translate-y-4"></div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-primary"></div>
                      </div>
                      <p className="text-sm font-medium text-foreground">Let's create something amazing together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">30+</p>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24">
        <div className="container max-w-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get in touch with me to discuss your ideas and how I can help bring them to life.
          </p>
          <Link href="/contact">
            <a>
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
