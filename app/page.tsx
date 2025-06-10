'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  AlertTriangle,
  Menu,
  X,
  Play,
  TrendingUp,
  Award,
  Lock
} from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-sand-6/50 bg-sand-1/80 backdrop-blur-xl supports-[backdrop-filter]:bg-sand-1/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-9 to-primary-10 rounded-xl shadow-custom-lg">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-sand-12">
                                Compliance Aide
                            </span>
                        </div>
                        
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link href="#features" className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-200">
                                Features
                            </Link>
                            <Link href="#solutions" className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-200">
                                Solutions
                            </Link>
                            <Link href="#customers" className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-200">
                                Customers
                            </Link>
                            <Link href="#pricing" className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-200">
                                Pricing
                            </Link>
                        </nav>

                        <div className="hidden lg:flex items-center gap-3">
                            <Button variant="ghost" size="sm" asChild className="text-sand-11 hover:text-sand-12 hover:bg-sand-3 transition-all duration-200">
                                <Link href="/auth/signin">Login</Link>
                            </Button>
                            <Button size="sm" asChild className="bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 shadow-custom-lg hover:shadow-primary transition-all duration-200 transform hover:scale-105">
                                <Link href="/auth/signup">Get Started</Link>
                            </Button>
                            <ThemeToggle />
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 bg-sand-1/95 backdrop-blur-xl border-t border-sand-6/50 mt-2 rounded-b-xl shadow-custom-xl">
                                <Link href="#features" className="block px-3 py-2 text-base font-medium text-sand-11 hover:text-sand-12 hover:bg-sand-3 rounded-lg transition-all duration-200">
                                    Features
                                </Link>
                                <Link href="#solutions" className="block px-3 py-2 text-base font-medium text-sand-11 hover:text-sand-12 hover:bg-sand-3 rounded-lg transition-all duration-200">
                                    Solutions
                                </Link>
                                <Link href="#customers" className="block px-3 py-2 text-base font-medium text-sand-11 hover:text-sand-12 hover:bg-sand-3 rounded-lg transition-all duration-200">
                                    Customers
                                </Link>
                                <Link href="#pricing" className="block px-3 py-2 text-base font-medium text-sand-11 hover:text-sand-12 hover:bg-sand-3 rounded-lg transition-all duration-200">
                                    Pricing
                                </Link>
                                <div className="pt-4 space-y-2">
                                    <Button variant="ghost" size="sm" asChild className="w-full justify-center">
                                        <Link href="/auth/signin">Login</Link>
                                    </Button>
                                    <Button size="sm" asChild className="w-full bg-gradient-to-r from-primary-9 to-primary-10">
                                        <Link href="/auth/signup">Get Started</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-sand-1">
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-3 border border-primary-6 rounded-full text-sm font-medium text-primary-11 mb-8 shadow-custom-sm backdrop-blur-sm">
                            <Award className="h-4 w-4" />
                            Trusted by 500+ healthcare organizations
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
                            <span className="block text-sand-12 leading-tight">
                                Compliance made
                            </span>
                            <span className="block bg-gradient-to-r from-primary-9 via-primary-10 to-primary-11 bg-clip-text text-transparent leading-tight">
                                beautifully simple
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl lg:text-2xl text-sand-11 mb-10 max-w-4xl mx-auto leading-relaxed">
                            The all-in-one platform for healthcare compliance, staff onboarding, and document management—built for modern care organizations who value efficiency and excellence.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Button size="lg" asChild className="text-base px-8 py-4 bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 shadow-custom-xl hover:shadow-primary-lg transition-all duration-300 transform hover:scale-105">
                                <Link href="/auth/signup" className="flex items-center gap-2">
                                    Start Free Trial
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild className="text-base px-8 py-4 border-2 border-sand-6 hover:border-sand-7 hover:bg-sand-2 transition-all duration-300 shadow-custom-lg hover:shadow-custom-xl">
                                <Link href="#demo" className="flex items-center gap-2">
                                    <Play className="h-5 w-5" />
                                    Watch Demo
                                </Link>
                            </Button>
                        </div>
                        
                        {/* Trust Indicators */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-sand-11">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="font-medium">4.9/5 from 200+ reviews</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-sand-6"></div>
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-success" />
                                <span>HIPAA Compliant & SOC 2 Certified</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-sand-6"></div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-brand" />
                                <span>99.9% Uptime SLA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-16 sm:py-24 bg-sand-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sand-12 mb-6">
                            Compliance is <em className="text-error-11 not-italic">complex</em>. 
                            <br className="hidden sm:block" />
                            It doesn't have to be.
                        </h2>
                        <p className="text-lg sm:text-xl text-sand-11 max-w-4xl mx-auto leading-relaxed">
                            From staff certifications to regulatory requirements, compliance challenges are inevitable. But administrative chaos and endless paperwork don't have to be.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: AlertTriangle,
                                title: "Manual Processes",
                                description: "Paper forms, spreadsheets, and email chains create bottlenecks, human error, and frustrated staff who can't focus on patient care.",
                                colorClass: "text-sand-11"
                            },
                            {
                                icon: Clock,
                                title: "Slow Onboarding",
                                description: "New staff wait 2-4 weeks to start working due to compliance documentation delays, costing organizations thousands in lost productivity.",
                                colorClass: "text-sand-11"
                            },
                            {
                                icon: FileText,
                                title: "Scattered Documents",
                                description: "Critical compliance documents are lost across different systems, filing cabinets, and email threads, creating audit nightmares.",
                                colorClass: "text-sand-11"
                            }
                        ].map((problem, index) => (
                            <div key={index} className="group">
                                <Card className="h-full surface-2 hover:surface-3">
                                    <CardContent className="p-8 text-center">
                                        <div className="w-20 h-20 border border-sand-4/50 bg-sand-1 rounded-2xl flex items-center justify-center mx-auto mb-6  transition-transform duration-300 shadow-custom-xs">
                                            <problem.icon className={`h-10 w-10 ${problem.colorClass}`} />
                                        </div>
                                        <h3 className="text-xl font-bold text-sand-12 mb-4">{problem.title}</h3>
                                        <p className="text-sand-11 leading-relaxed">{problem.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 lg:mt-20">
                        <div className="bg-sand-1/80 backdrop-blur-sm rounded-2xl border border-sand-6 p-8 lg:p-12 shadow-custom-xl">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                                {[
                                    { value: "3 weeks", label: "Average onboarding time", subtext: "with manual processes" },
                                    { value: "47%", label: "Time spent on admin", subtext: "instead of patient care" },
                                    { value: "$12K", label: "Cost per audit failure", subtext: "in fines and remediation" },
                                    { value: "73%", label: "Staff frustration", subtext: "with current systems" }
                                ].map((stat, index) => (
                                    <div key={index} className="group">
                                        <div className="text-3xl lg:text-4xl font-bold text-error-11 mb-2 group-hover:scale-110 transition-transform duration-300">
                                            {stat.value}
                                        </div>
                                        <div className="text-lg font-semibold text-sand-12 mb-1">{stat.label}</div>
                                        <div className="text-sm text-sand-11">{stat.subtext}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Overview */}
            <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-sand-1">
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 lg:mb-20">
                        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-success text-green-800 border-success">
                            The Solution
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sand-12 mb-6 leading-tight">
                            Meet the <em className="text-brand not-italic">compliance command center</em>
                            <br className="hidden lg:block" /> 
                            for modern care organizations
                        </h2>
                        <p className="text-lg sm:text-xl text-sand-11 max-w-4xl mx-auto leading-relaxed">
                            From application to approval, give your team everything they need to onboard quickly, stay compliant, and focus on what matters most—caring for others.
                        </p>
                    </div>

                    {/* Interactive Demo Placeholder */}
                    <div className="relative mb-16 lg:mb-20">
                        <div className="bg-sand-2 rounded-3xl border border-sand-6 aspect-video flex items-center justify-center shadow-custom-xl transition-all duration-500 group overflow-hidden">
                            
                            <div className="relative text-center p-8">
                                <div className="w-24 h-24 bg-gradient-to-br from-primary-9 to-primary-10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-custom-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Shield className="h-12 w-12 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-sand-12 mb-4">Interactive Product Demo</h3>
                                <p className="text-sand-11 mb-6 max-w-md mx-auto">See how Compliance Aide transforms your onboarding process in under 3 minutes</p>
                                <Button className="bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 shadow-custom-lg hover:shadow-primary transition-all duration-300">
                                    <Play className="h-5 w-5 mr-2" />
                                    Watch Demo
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Key Benefits Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            {
                                icon: TrendingUp,
                                title: "85% Faster",
                                description: "Onboarding time reduced from weeks to days",
                                color: "text-brand"
                            },
                            {
                                icon: Shield,
                                title: "100% Compliant",
                                description: "Never fail an audit with automated tracking",
                                color: "text-brand"
                            },
                            {
                                icon: Users,
                                title: "Team Focused",
                                description: "Staff focus on care, not paperwork",
                                color: "text-brand"
                            },
                            {
                                icon: Zap,
                                title: "Instant Setup",
                                description: "Go live in under 24 hours",
                                color: "text-brand"
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-16 h-16 border border-sand-4/50 bg-sand-1 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-custom-xs group-hover:shadow-custom-sm transition-all duration-300">
                                    <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                                </div>
                                <h3 className="text-lg font-bold text-sand-12 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-sand-11">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            <section id="features" className="py-16 sm:py-24 lg:py-32 bg-sand-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Onboarding Feature */}
                    <div className="mb-20 lg:mb-32">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <Badge variant="secondary" className="bg-success text-green-800 border-success px-4 py-2">
                                        <UserCheck className="h-4 w-4 mr-2" />
                                        Smart Onboarding
                                    </Badge>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-sand-12 leading-tight">
                                        Transform weeks into 
                                        <span className="text-success"> days</span> with intelligent workflows
                                    </h3>
                                    <p className="text-lg text-sand-11 leading-relaxed">
                                        Guided workflows, automated document collection, and real-time progress tracking reduce onboarding time from weeks to days. Your staff starts caring for patients faster.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    {[
                                        { text: "Digital forms with smart validation and auto-save", icon: CheckCircle },
                                        { text: "Automated document verification with AI", icon: CheckCircle },
                                        { text: "Real-time progress tracking and notifications", icon: CheckCircle },
                                        { text: "Mobile-friendly interface for on-the-go completion", icon: CheckCircle }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-start gap-4 group">
                                            <div className="flex-shrink-0 w-6 h-6 bg-green-3 rounded-full flex items-center justify-center mt-1 group-hover:bg-green-4 transition-colors duration-200">
                                                <feature.icon className="h-4 w-4 text-success" />
                                            </div>
                                            <span className="text-sand-11 group-hover:text-sand-12 transition-colors duration-200">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-gradient-to-r from-green-9 to-green-10 hover:from-green-10 hover:to-green-11 shadow-success">
                                        <Link href="/auth/signup">Start Free Trial</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="border-green-7 text-success hover:bg-green-3">
                                        <Link href="#demo">See It In Action</Link>
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="bg-green-2 rounded-3xl border-2 border-green-6 aspect-square flex items-center justify-center shadow-custom-2xl hover:shadow-custom-3xl transition-all duration-500 overflow-hidden group">
                                    <div className="relative text-center p-8">
                                        <div className="w-24 h-24 bg-gradient-to-br from-green-9 to-green-10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-custom-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <UserCheck className="h-12 w-12 text-white" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="text-lg font-semibold text-sand-12">Onboarding Dashboard</div>
                                            <div className="text-sm text-sand-11">Interactive form builder coming soon</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Customer Quote */}
                        <div className="mt-12 lg:mt-16">
                            <Card className="bg-green-2 border-2 border-green-6 shadow-custom-xl">
                                <CardContent className="p-8 lg:p-12">
                                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                                        <div className="flex-1">
                                            <div className="flex mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <blockquote className="text-lg lg:text-xl text-sand-11 mb-6 leading-relaxed italic">
                                                "We reduced our staff onboarding time from 3 weeks to 5 days. New caregivers can start providing care faster, and our admin team focuses on what matters instead of chasing paperwork. It's been transformational."
                                            </blockquote>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-green-9 to-green-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    SM
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sand-12 text-lg">Sarah Martinez</div>
                                                    <div className="text-sand-11">Director of Operations</div>
                                                    <div className="text-sm text-sand-10">CareFirst Healthcare</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="bg-green-3 rounded-2xl p-6 text-center">
                                                <div className="text-3xl font-bold text-success mb-2">85%</div>
                                                <div className="text-sm text-green-11 font-medium">Faster Onboarding</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Document Management Feature */}
                    <div className="mb-20 lg:mb-32">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="lg:order-2 space-y-8">
                                <div className="space-y-4">
                                    <Badge variant="secondary" className="bg-blue-3 text-blue-11 border-blue-7 px-4 py-2">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Document Intelligence
                                    </Badge>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-sand-12 leading-tight">
                                        Never lose a document or 
                                        <span className="text-blue-11"> miss a deadline</span> again
                                    </h3>
                                    <p className="text-lg text-sand-11 leading-relaxed">
                                        Centralized document storage with AI-powered expiry tracking, compliance monitoring, and secure access controls. Stay audit-ready 24/7.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    {[
                                        { text: "AI-powered expiry notifications with smart reminders", icon: CheckCircle },
                                        { text: "Bank-level security with HIPAA compliance", icon: CheckCircle },
                                        { text: "Real-time compliance status dashboard", icon: CheckCircle },
                                        { text: "Automated backup and version control", icon: CheckCircle }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-start gap-4 group">
                                            <div className="flex-shrink-0 w-6 h-6 bg-blue-3 rounded-full flex items-center justify-center mt-1 group-hover:bg-blue-4 transition-colors duration-200">
                                                <feature.icon className="h-4 w-4 text-blue-11" />
                                            </div>
                                            <span className="text-sand-11 group-hover:text-sand-12 transition-colors duration-200">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-gradient-to-r from-blue-9 to-blue-10 hover:from-blue-10 hover:to-blue-11 shadow-custom-lg">
                                        <Link href="/auth/signup">Try Document Hub</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="border-blue-7 text-blue-11 hover:bg-blue-3">
                                        <Link href="#demo">View Dashboard</Link>
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="lg:order-1 relative">
                                <div className="bg-blue-2 rounded-3xl border-2 border-blue-6 aspect-square flex items-center justify-center shadow-custom-2xl hover:shadow-custom-3xl transition-all duration-500 overflow-hidden group">
                                    <div className="relative text-center p-8">
                                        <div className="w-24 h-24 bg-gradient-to-br from-blue-9 to-blue-10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-custom-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <FileText className="h-12 w-12 text-white" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="text-lg font-semibold text-sand-12">Document Center</div>
                                            <div className="text-sm text-sand-11">AI-powered organization system</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Customer Quote */}
                        <div className="mt-12 lg:mt-16">
                            <Card className="bg-blue-2 border-2 border-blue-6 shadow-custom-xl">
                                <CardContent className="p-8 lg:p-12">
                                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                                        <div className="flex-1">
                                            <div className="flex mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <blockquote className="text-lg lg:text-xl text-sand-11 mb-6 leading-relaxed italic">
                                                "Never again will we scramble before an inspection. Everything is organized, up-to-date, and accessible instantly. Our compliance officer finally sleeps well at night."
                                            </blockquote>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-9 to-blue-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    MC
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sand-12 text-lg">Michael Chen</div>
                                                    <div className="text-sand-11">Compliance Manager</div>
                                                    <div className="text-sm text-sand-10">Golden Years Care</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <div className="bg-blue-3 rounded-2xl p-6 text-center">
                                                <div className="text-3xl font-bold text-blue-11 mb-2">100%</div>
                                                <div className="text-sm text-blue-11 font-medium">Audit Success</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Verification Feature */}
                    <div className="mb-20 lg:mb-32">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <Badge variant="secondary" className="bg-primary-3 text-primary-11 border-primary-7 px-4 py-2">
                                        <Shield className="h-4 w-4 mr-2" />
                                        Smart Verification
                                    </Badge>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-sand-12 leading-tight">
                                        Streamlined approvals with 
                                        <span className="text-brand"> zero bottlenecks</span>
                                    </h3>
                                    <p className="text-lg text-sand-11 leading-relaxed">
                                        Multi-level approval processes with automated notifications, complete audit trails, and integration with regulatory requirements. Compliance made elegant.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    {[
                                        { text: "Multi-level approval workflows with smart routing", icon: CheckCircle },
                                        { text: "Complete audit trails with blockchain verification", icon: CheckCircle },
                                        { text: "Automated status updates and notifications", icon: CheckCircle },
                                        { text: "Integration with regulatory databases", icon: CheckCircle }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-start gap-4 group">
                                            <div className="flex-shrink-0 w-6 h-6 bg-primary-3 rounded-full flex items-center justify-center mt-1 group-hover:bg-primary-4 transition-colors duration-200">
                                                <feature.icon className="h-4 w-4 text-brand" />
                                            </div>
                                            <span className="text-sand-11 group-hover:text-sand-12 transition-colors duration-200">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild className="bg-gradient-to-r from-primary-9 to-primary-10 hover:from-primary-10 hover:to-primary-11 shadow-primary">
                                        <Link href="/auth/signup">See Workflow Builder</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="border-primary-7 text-brand hover:bg-primary-3">
                                        <Link href="#demo">Watch Tutorial</Link>
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="bg-primary-2 rounded-3xl border-2 border-primary-6 aspect-square flex items-center justify-center shadow-custom-2xl hover:shadow-primary-lg transition-all duration-500 overflow-hidden group">
                                    <div className="relative text-center p-8">
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary-9 to-primary-10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-custom-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <Shield className="h-12 w-12 text-white" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="text-lg font-semibold text-sand-12">Approval Pipeline</div>
                                            <div className="text-sm text-sand-11">Intelligent workflow automation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Foundations */}
            <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-sand-1">
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 lg:mb-20">
                        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-primary-3 text-primary-11 border-primary-7">
                            Platform Excellence
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sand-12 mb-6 leading-tight">
                            Built on <em className="text-brand not-italic">rock-solid foundations</em>
                        </h2>
                        <p className="text-lg sm:text-xl text-sand-11 max-w-4xl mx-auto leading-relaxed">
                            Enterprise-grade infrastructure meets healthcare expertise. Security, reliability, and scalability you can trust.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Security First",
                                description: "Enterprise-grade security with HIPAA compliance, SOC 2 certification, and end-to-end encryption.",
                                features: ["HIPAA Compliant", "SOC 2 Type II", "AES-256 Encryption"]
                            },
                            {
                                icon: Zap,
                                title: "Smart Automation",
                                description: "AI-powered workflows reduce manual work by 80% and ensure consistent, error-free processes.",
                                features: ["AI-Powered", "80% Less Manual Work", "Zero Errors"]
                            },
                            {
                                icon: Users,
                                title: "Team Collaboration",
                                description: "Real-time collaboration tools, role-based permissions, and instant notifications keep everyone aligned.",
                                features: ["Real-time Sync", "Role-based Access", "Instant Alerts"]
                            },
                            {
                                icon: Building2,
                                title: "Enterprise Ready",
                                description: "Scales from 10 to 10,000+ users. Single sign-on, API access, and dedicated support included.",
                                features: ["Unlimited Scale", "SSO Integration", "24/7 Support"]
                            }
                        ].map((feature, index) => (
                            <div key={index} className="group">
                                <Card className="h-full surface-2 rounded-xl !shadow-custom-xs">
                                    <CardHeader className="pb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-9 to-primary-10 rounded-2xl flex items-center justify-center mb-4 shadow-custom-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <feature.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-sand-12">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <CardDescription className="text-sand-11 leading-relaxed">
                                            {feature.description}
                                        </CardDescription>
                                        <div className="space-y-2">
                                            {feature.features.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-sand-9 to-sand-10 rounded-full"></div>
                                                    <span className="text-sand-11">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Integration Partners */}
                    <div className="mt-16 lg:mt-20">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-sand-12 mb-4">Integrates with your existing tools</h3>
                            <p className="text-sand-11">Connect seamlessly with the platforms you already use</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
                            {[
                                "Microsoft 365", "Google Workspace", "Slack", "Teams", "Salesforce", "Epic"
                            ].map((partner, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-sand-11 rounded-xl flex items-center justify-center mx-auto mb-2 hover:bg-sand-10 transition-colors duration-200 shadow-custom-sm">
                                        <Building2 className="h-8 w-8 text-sand-1" />
                                    </div>
                                    <div className="font-semibold text-sand-12">{partner}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Social Proof */}
            <section id="customers" className="py-16 sm:py-24 lg:py-32 bg-sand-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 lg:mb-20">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-sand-12">4.9/5</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sand-12 mb-6">
                            Healthcare teams <em className="text-brand not-italic">love</em> Compliance Aide
                        </h2>
                        <p className="text-lg sm:text-xl text-sand-11">Based on 200+ verified reviews from healthcare professionals</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                quote: "Game-changer for our operations. What used to take our team hours now happens automatically. Our staff can focus on patient care instead of endless paperwork.",
                                author: "Lisa Thompson",
                                role: "Operations Director",
                                company: "Regional Medical Center",
                                avatar: "LT",
                                gradient: "bg-blue-9",
                                stat: { value: "85%", label: "Time Saved" }
                            },
                            {
                                quote: "The customer support is incredible. When we requested a feature, they had it implemented within days. They truly understand healthcare compliance.",
                                author: "Dr. James Wilson",
                                role: "Medical Director",
                                company: "Wilson Family Practice",
                                avatar: "JW",
                                gradient: "bg-blue-9",
                                stat: { value: "24hrs", label: "Response Time" }
                            },
                            {
                                quote: "We passed our last inspection with flying colors. The auditors were impressed with our documentation system. Best investment we've made.",
                                author: "Maria Rodriguez",
                                role: "Quality Assurance Manager",
                                company: "Sunshine Care Facility",
                                avatar: "MR",
                                gradient: "bg-primary-9",
                                stat: { value: "100%", label: "Audit Success" }
                            }
                        ].map((testimonial, index) => (
                            <Card key={index} className="h-full surface-2 hover:surface-3 interactive-surface rounded-xl">
                                <CardContent className="p-8 flex flex-col">
                                    <div className="flex mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <blockquote className="text-lg text-sand-11 mb-8 leading-relaxed italic flex-1">
                                        "{testimonial.quote}"
                                    </blockquote>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 bg-primary-10  rounded-full flex items-center justify-center text-white font-bold text-lg shadow-custom-lg`}>
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sand-12 text-lg">{testimonial.author}</div>
                                                <div className="text-sand-11">{testimonial.role}</div>
                                                <div className="text-sm text-sand-10">{testimonial.company}</div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-brand mb-1">{testimonial.stat.value}</div>
                                            <div className="text-xs text-sand-11 font-medium">{testimonial.stat.label}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Company logos */}
                    <div className="border-t border-sand-6 pt-16">
                        <div className="text-center mb-12">
                            <p className="text-lg text-sand-11">Trusted by leading healthcare organizations</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center opacity-60">
                            {[
                                "CareFirst Health", "Regional Medical", "Sunshine Care", "Wilson Practice", "Metro Hospital"
                            ].map((company, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-lg font-bold text-sand-11">{company}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Final CTA */}
            <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary-9 via-primary-10 to-primary-11">
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            So good, you'll <em className="not-italic">love</em> compliance
                        </h2>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
                            Ready for modern compliance management? Join hundreds of healthcare organizations who trust Compliance Aide to streamline their operations.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                            <Button size="lg" asChild className="text-base px-8 py-4 bg-white text-primary-9 hover:bg-sand-50 shadow-custom-xl hover:shadow-custom-3xl transition-all duration-300 transform hover:scale-105">
                                <Link href="/auth/signup" className="flex items-center gap-2">
                                    Start Free Trial
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-base px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-9 transition-all duration-300 shadow-custom-lg hover:shadow-custom-xl">
                                Schedule Demo
                            </Button>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-8 text-center opacity-80 mb-8">
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                <span>Setup in under 10 minutes</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                <span>30-day free trial</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm opacity-75">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                <span>HIPAA Compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>SOC 2 Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                <span>99.9% Uptime SLA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="bg-sand-1 border-t border-sand-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-9 to-primary-10 rounded-xl shadow-custom-lg">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-sand-12">
                                    Compliance Aide
                                </span>
                            </div>
                            <p className="text-sand-11 mb-6 leading-relaxed max-w-md">
                                Making healthcare compliance simple, secure, and efficient for organizations of all sizes. Trusted by 500+ healthcare teams worldwide.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-sand-11">4.9/5 from 200+ reviews</span>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-sand-12 mb-4">Product</h3>
                            <ul className="space-y-3 text-sm text-sand-11">
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Smart Onboarding</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Document Intelligence</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Verification Workflows</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Compliance Dashboard</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Mobile App</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-sand-12 mb-4">Company</h3>
                            <ul className="space-y-3 text-sm text-sand-11">
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">About Us</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Careers</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Customer Stories</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Press Kit</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Contact</Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-bold text-sand-12 mb-4">Resources</h3>
                            <ul className="space-y-3 text-sm text-sand-11">
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">API Documentation</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Security</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-sand-12 transition-colors duration-200">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="py-8 border-t border-sand-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-sand-11">
                            © 2025 Compliance Aide. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6 text-sm text-sand-11">
                            <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-success" />
                                <span>HIPAA Compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-brand" />
                                <span>SOC 2 Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
} 