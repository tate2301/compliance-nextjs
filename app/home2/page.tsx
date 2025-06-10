'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import { 
  CheckCircle, 
  Shield, 
  Clock, 
  Users, 
  FileText, 
  Zap, 
  Star,
  ArrowRight,
  Building2,
  UserCheck,
  Menu,
  X,
  Play,
  TrendingUp,
  Award,
  Lock,
  Eye,
  BarChart3,
  Sparkles,
  ChevronRight,
  Globe,
  Layers,
  Workflow,
  Brain,
  Activity,
  Database,
  Cpu,
  CheckSquare,
  AlertCircle,
  Timer,
  Target
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home2Page() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <>
            {/* Gradient Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-sand-1 via-sand-1 to-sand-2 pointer-events-none" />
            
            {/* Animated Background Grid */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 50%)`
                }} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-sand-6/30 bg-sand-1/80 backdrop-blur-xl supports-[backdrop-filter]:bg-sand-1/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-primary-9 to-primary-10 rounded-xl shadow-custom-lg group-hover:shadow-primary transition-all duration-300">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-br from-primary-9 to-primary-10 rounded-xl opacity-20 blur animate-pulse" />
                            </div>
                            <span className="text-lg font-bold text-sand-12 tracking-tight">
                                Compliance Aide
                            </span>
                        </div>
                        
                        <nav className="hidden md:flex items-center gap-8">
                            {['Features', 'Platform', 'Customers', 'Pricing', 'Docs'].map((item) => (
                                <Link key={item} href={`#${item.toLowerCase()}`} className="relative text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-300 group">
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-9 to-primary-10 group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <Button variant="ghost" size="sm" asChild className="text-sand-11 hover:text-sand-12 hover:bg-sand-3 transition-all duration-300">
                                <Link href="/auth/signin">Sign in</Link>
                            </Button>
                            <Button size="sm" asChild className="bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 text-white shadow-custom-lg hover:shadow-primary transition-all duration-300 hover:scale-105">
                                <Link href="/auth/signup" className="flex items-center gap-1">
                                    Start for free
                                    <ArrowRight className="h-3 w-3" />
                                </Link>
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="transition-all duration-300"
                            >
                                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-sand-6/30 animate-in slide-in-from-top-2 duration-300">
                            <div className="space-y-3">
                                {['Features', 'Platform', 'Customers', 'Pricing', 'Docs'].map((item) => (
                                    <Link key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-sand-11 hover:text-sand-12 transition-colors py-2">
                                        {item}
                                    </Link>
                                ))}
                                <div className="pt-3 space-y-2">
                                    <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                                        <Link href="/auth/signin">Sign in</Link>
                                    </Button>
                                    <Button size="sm" asChild className="w-full bg-gradient-to-r from-primary-9 to-primary-10">
                                        <Link href="/auth/signup">Start for free</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Animated Trust Badge */}
                    <div className={`inline-flex items-center gap-3 px-4 py-2 bg-sand-3/50 border border-sand-6/50 rounded-full text-sm font-medium text-sand-11 mb-8 backdrop-blur-sm transition-all duration-1000 ${isLoaded ? 'opacity-100 transand-y-0' : 'opacity-0 transand-y-4'}`}>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400 animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                            ))}
                        </div>
                        <span className="font-semibold">5.0</span>
                        <span className="text-sand-9">•</span>
                        <span>Healthcare focused</span>
                        <span className="text-sand-9">•</span>
                        <span>Founded 2024</span>
                        <span className="text-sand-9">•</span>
                        <span className="text-green-11">Close to 0% churn</span>
                    </div>

                    {/* Main Headline with Gradient Animation */}
                    <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-sand-12 mb-8 tracking-tight transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 transand-y-0' : 'opacity-0 transand-y-8'}`}>
                        Compliance,{' '}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-primary-9 via-primary-10 to-primary-11 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                                simplified.
                            </span>
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-9/20 via-primary-10/20 to-primary-11/20 blur-2xl -z-10 animate-pulse" />
                        </span>
                    </h1>
                    
                    <p className={`text-xl sm:text-2xl text-sand-11 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 transand-y-0' : 'opacity-0 transand-y-8'}`}>
                        Compliance Aide is a <em className="text-primary-11 font-medium not-italic">joyful</em> healthcare compliance platform.
                        <br className="hidden sm:inline" />
                        HIPAA-compliant, lightweight, independent.
                    </p>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 transand-y-0' : 'opacity-0 transand-y-8'}`}>
                        <Button size="lg" asChild className="bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 text-white px-8 py-4 text-lg shadow-custom-xl hover:shadow-primary-lg transition-all duration-300 hover:scale-105 group">
                            <Link href="/auth/signup" className="flex items-center gap-2">
                                Add to your organization
                                <ArrowRight className="h-5 w-5 group-hover:transand-x-1 transition-transform duration-300" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-2 border-sand-7 text-sand-11 hover:bg-sand-3 px-8 py-4 text-lg shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm">
                            <Link href="#demo" className="flex items-center gap-2">
                                <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                View live demo
                            </Link>
                        </Button>
                    </div>

                    {/* Enhanced Trust Indicators */}
                    <div className={`transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 transand-y-0' : 'opacity-0 transand-y-8'}`}>
                        <p className="text-sm font-medium text-sand-11 mb-8 tracking-wider">
                            TRUSTED BY 500+ HEALTHCARE ORGANIZATIONS FAR AND WIDE
                        </p>

                        {/* Company logos with hover effects */}
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center mb-20">
                            {[
                                "CareFirst", "Regional Medical", "Sunshine Care", "Wilson Practice", "Metro Hospital", "Health Partners"
                            ].map((company, index) => (
                                <div key={index} className="text-center group cursor-pointer transition-all duration-300 hover:scale-110">
                                    <div className="text-sm font-medium text-sand-9 group-hover:text-sand-11 transition-colors duration-300">
                                        {company}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Premium Product Demo */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`relative transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 transand-y-0' : 'opacity-0 transand-y-12'}`}>
                        {/* Floating elements for depth */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary-9/10 to-primary-10/10 rounded-full blur-xl animate-float" />
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-green-9/10 to-green-10/10 rounded-full blur-xl animate-float-delayed" />
                        
                        <div className="bg-sand-2/80 border border-sand-6/50 rounded-3xl p-8 lg:p-12 shadow-custom-2xl backdrop-blur-xl hover:shadow-custom-3xl transition-all duration-500 group">
                            {/* Dashboard Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                </div>
                                <div className="text-sm text-sand-11 font-mono">compliance-aide.com/dashboard</div>
                            </div>

                            {/* Main Dashboard */}
                            <Card className="bg-sand-1/90 border-sand-6/50 shadow-custom-xl backdrop-blur-sm group-hover:shadow-custom-2xl transition-all duration-500">
                                <CardHeader className="pb-6">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl font-bold text-sand-12">Compliance Dashboard</CardTitle>
                                        <Badge className="bg-green-3 text-green-11 border-green-7 animate-pulse">
                                            <Activity className="h-3 w-3 mr-1" />
                                            Real-time
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {/* KPI Grid */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: "Active Staff", value: "247", change: "+12.5%", icon: Users, color: "text-blue-11" },
                                            { label: "Compliance Rate", value: "98%", change: "+5.2%", icon: Shield, color: "text-green-11" },
                                            { label: "Avg Onboarding", value: "3.2d", change: "-85%", icon: Timer, color: "text-primary-11" },
                                            { label: "Audit Failures", value: "0", change: "-100%", icon: Target, color: "text-green-11" }
                                        ].map((metric, index) => (
                                            <div key={index} className="p-6 bg-sand-2/50 rounded-2xl border border-sand-6/30 hover:bg-sand-2/70 transition-all duration-300 group/metric">
                                                <div className="flex items-center justify-between mb-3">
                                                    <metric.icon className={`h-5 w-5 ${metric.color} group-hover/metric:scale-110 transition-transform duration-300`} />
                                                    <div className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-11' : metric.change.startsWith('-') && metric.label !== 'Audit Failures' ? 'text-red-11' : 'text-green-11'}`}>
                                                        {metric.change}
                                                    </div>
                                                </div>
                                                <div className="text-3xl font-bold text-sand-12 mb-1">{metric.value}</div>
                                                <div className="text-sm text-sand-11">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-semibold text-sand-12">Recent Onboardings</h4>
                                            <Button variant="ghost" size="sm" className="text-sand-11 hover:text-sand-12">
                                                View all
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
                                        {[
                                            { name: "Sarah Martinez", role: "RN", status: "Completed", time: "2h ago", statusColor: "bg-green-3 text-green-11" },
                                            { name: "Michael Chen", role: "PT", status: "In Progress", time: "4h ago", statusColor: "bg-blue-3 text-blue-11" },
                                            { name: "Lisa Thompson", role: "CNA", status: "Documents Pending", time: "6h ago", statusColor: "bg-amber-3 text-amber-11" }
                                        ].map((person, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-sand-1/50 rounded-xl border border-sand-6/30 hover:bg-sand-1/70 transition-all duration-300 group/person">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-9 to-primary-10 rounded-full flex items-center justify-center text-white font-semibold shadow-custom-lg group-hover/person:shadow-primary transition-all duration-300">
                                                        {person.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-sand-12">{person.name}</div>
                                                        <div className="text-sm text-sand-11">{person.role}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-sand-11 mb-1">{person.time}</div>
                                                    <Badge className={`text-xs ${person.statusColor}`}>
                                                        {person.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Value Propositions */}
            <section className="py-24 sm:py-32 bg-sand-2/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-bold text-sand-12 mb-6">
                            Healthcare compliance how it <em className="text-primary-11 not-italic">should be</em>
                        </h2>
                        <p className="text-xl text-sand-11 max-w-3xl mx-auto">
                            Every online business should have web analytics in place. It's essential. But it's not always easy to find the right tool.
                        </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: Zap,
                                title: "Fast Setup",
                                description: "Go live in minutes, not weeks. Simple integration with your existing workflow.",
                                features: ["5-minute setup", "Zero configuration", "Works everywhere"]
                            },
                            {
                                icon: Shield,
                                title: "HIPAA Compliant",
                                description: "Built for healthcare from day one. SOC 2 certified with end-to-end encryption.",
                                features: ["Bank-level security", "SOC 2 Type II", "Zero-trust architecture"]
                            },
                            {
                                icon: Eye,
                                title: "Crystal Clear",
                                description: "See exactly where you stand. No confusing dashboards or endless reports.",
                                features: ["Real-time insights", "Intuitive design", "Mobile-first"]
                            }
                        ].map((prop, index) => (
                            <Card key={index} className="p-8 bg-sand-1/80 border-sand-6/50 hover:bg-sand-1 transition-all duration-500 group hover:shadow-custom-xl backdrop-blur-sm">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-sand-1 to-sand-2 border border-sand-6/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-custom-lg group-hover:shadow-custom-xl group-hover:scale-110 transition-all duration-500">
                                        <prop.icon className="h-8 w-8 text-primary-9 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-sand-12 mb-4">{prop.title}</h3>
                                    <p className="text-sand-11 mb-6 leading-relaxed">{prop.description}</p>
                                    <div className="space-y-2">
                                        {prop.features.map((feature, i) => (
                                            <div key={i} className="flex items-center justify-center gap-2 text-sm text-sand-10">
                                                <CheckCircle className="h-4 w-4 text-green-11" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Testimonials */}
            <section className="py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {[
                            {
                                quote: "Previously, I had all of my facilities hooked up to legacy compliance systems, like most people. But I never looked at the reports. Now, I find myself dropping in and looking at the stats several times a day. It's very easy to digest and understand.",
                                author: "Sarah Martinez",
                                role: "Director of Operations",
                                company: "CareFirst Healthcare",
                                avatar: "SM",
                                gradient: "from-green-9 to-green-10"
                            },
                            {
                                quote: "It just works, no need to navigate endless dashboards or worry about compliance issues. That simplicity saves us time and helps us stay focused on building our business.",
                                author: "Dr. Michael Chen",
                                role: "Medical Director", 
                                company: "Regional Medical",
                                avatar: "MC",
                                gradient: "from-blue-9 to-blue-10"
                            }
                        ].map((testimonial, index) => (
                            <Card key={index} className="p-8 lg:p-10 bg-sand-1/80 border-sand-6/50 hover:bg-sand-1 transition-all duration-500 group hover:shadow-custom-xl backdrop-blur-sm">
                                <div className="flex mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <blockquote className="text-lg text-sand-11 mb-8 leading-relaxed italic">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-custom-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sand-12 text-lg">{testimonial.author}</div>
                                        <div className="text-sand-11">{testimonial.role}</div>
                                        <div className="text-sm text-sand-10">{testimonial.company}</div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className="py-24 sm:py-32 bg-sand-2/50 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-9/5 to-primary-10/5" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-9/10 to-primary-10/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-green-9/10 to-green-10/10 rounded-full blur-3xl" />
                
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-sand-12 mb-8">
                        Get Compliance Aide up and running <em className="text-primary-11 not-italic">in minutes</em>
                    </h2>
                    <p className="text-xl text-sand-11 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Compliance Aide focuses hard on simplicity, minimalism and ease of use. 
                        There's absolutely no need to deal with complicated tools that only create more problems.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button size="lg" asChild className="bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 text-white px-8 py-4 text-lg shadow-custom-xl hover:shadow-primary-lg transition-all duration-300 hover:scale-105 group">
                            <Link href="/auth/signup" className="flex items-center gap-2">
                                Add to your organization
                                <ArrowRight className="h-5 w-5 group-hover:transand-x-1 transition-transform duration-300" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-2 border-sand-7 text-sand-11 hover:bg-sand-3 px-8 py-4 text-lg shadow-custom-lg hover:shadow-custom-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                            <Link href="#demo">View live demo</Link>
                        </Button>
                    </div>
                    
                    <p className="text-sand-11 mb-8">
                        Free for 50 staff members per month. No credit card required.
                    </p>

                    {/* Trust indicators */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-sand-11">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-11" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-11" />
                            <span>Setup in under 10 minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-11" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="bg-sand-1 border-t border-sand-6/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-9 to-primary-10 rounded-lg flex items-center justify-center shadow-custom-lg">
                                    <Shield className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-sand-12">Compliance Aide</span>
                            </div>
                            <p className="text-sand-11 mb-6 leading-relaxed max-w-md">
                                Making healthcare compliance simple, secure, and efficient for organizations of all sizes. 
                                Trusted by 500+ healthcare teams worldwide.
                            </p>
                            <p className="text-sm text-sand-10 mb-6">
                                Made and hosted in EU.
                            </p>
                            <p className="text-xs text-sand-10">
                                Compliance Aide analytics, 2025.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-sand-12 mb-4">Product</h3>
                            <ul className="space-y-3 text-sm text-sand-11">
                                <li><Link href="#pricing" className="hover:text-sand-12 transition-colors">Pricing</Link></li>
                                <li><Link href="/docs" className="hover:text-sand-12 transition-colors">Docs</Link></li>
                                <li><Link href="/affiliates" className="hover:text-sand-12 transition-colors">Affiliates</Link></li>
                                <li><Link href="/status" className="hover:text-sand-12 transition-colors">Status page</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-sand-12 mb-4">Contact us</h3>
                            <ul className="space-y-3 text-sm text-sand-11">
                                <li><Link href="mailto:hello@complianceaide.com" className="hover:text-sand-12 transition-colors">Email</Link></li>
                                <li><Link href="/chat" className="hover:text-sand-12 transition-colors">Live chat</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-sand-12 mb-4">Legal</h3>
                            <ul className="space-y-3 text-sm text-sand-11">
                                <li><Link href="/terms" className="hover:text-sand-12 transition-colors">Terms & conditions</Link></li>
                                <li><Link href="/privacy" className="hover:text-sand-12 transition-colors">Privacy</Link></li>
                                <li><Link href="/hipaa" className="hover:text-sand-12 transition-colors">HIPAA</Link></li>
                                <li><Link href="/imprint" className="hover:text-sand-12 transition-colors">Imprint</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: transandY(0px); }
                    50% { transform: transandY(-20px); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: transandY(0px); }
                    50% { transform: transandY(-15px); }
                }
                .animate-gradient { animation: gradient 8s ease infinite; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
            `}</style>
        </>
    )
} 