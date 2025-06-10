"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp,
  Shield,
  Calendar,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Mock data - replace with real API calls
const mockData = {
  overview: {
    totalStaff: 245,
    compliantStaff: 198,
    pendingDocuments: 47,
    expiringSoon: 12,
    complianceRate: 80.8,
    complianceChange: 2.3,
  },
  recentAlerts: [
    {
      id: 1,
      type: "expiring",
      message: "DBS certificate expiring in 7 days for John Smith",
      staff: "John Smith",
      priority: "high",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "missing",
      message: "Missing right to work document for Sarah Johnson",
      staff: "Sarah Johnson", 
      priority: "critical",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      type: "training",
      message: "Mandatory training due for 5 staff members",
      staff: "Multiple",
      priority: "medium",
      timestamp: "1 day ago"
    },
  ],
  complianceByDepartment: [
    { department: "Nursing", total: 89, compliant: 76, rate: 85.4 },
    { department: "Support Staff", total: 67, compliant: 52, rate: 77.6 },
    { department: "Administration", total: 45, compliant: 42, rate: 93.3 },
    { department: "Management", total: 23, compliant: 23, rate: 100 },
    { department: "Maintenance", total: 21, compliant: 15, rate: 71.4 },
  ],
  recentActivity: [
    {
      id: 1,
      action: "Document submitted",
      staff: "Emma Wilson",
      document: "Enhanced DBS Certificate",
      timestamp: "15 minutes ago",
      status: "pending"
    },
    {
      id: 2,
      action: "Training completed",
      staff: "Michael Brown",
      document: "Fire Safety Training",
      timestamp: "1 hour ago",
      status: "approved"
    },
    {
      id: 3,
      action: "Document approved",
      staff: "Lisa Davis",
      document: "Right to Work Document",
      timestamp: "2 hours ago",
      status: "approved"
    },
  ]
};

function StatCard({ title, value, change, icon: Icon, trend, description }: {
  title: string;
  value: string | number;
  change?: number;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}) {
  const getTrendColor = () => {
    if (!trend || trend === 'neutral') return 'text-sand-11';
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = () => {
    if (!trend || trend === 'neutral') return null;
    return trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-sand-11">{title}</p>
          <p className="text-2xl font-bold text-sand-12 mt-1">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
              {description && (
                <span className="text-xs text-sand-11 ml-1">{description}</span>
              )}
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </Card>
  );
}

function AlertCard({ alert }: { alert: any }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-sand-100 text-sand-800 border-sand-200';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'expiring': return <Clock className="w-4 h-4" />;
      case 'missing': return <XCircle className="w-4 h-4" />;
      case 'training': return <Calendar className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 border border-sand-6 rounded-lg">
      <div className="mt-0.5">
        {getIcon(alert.type)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-sand-12">{alert.message}</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className={getPriorityColor(alert.priority)}>
            {alert.priority}
          </Badge>
          <span className="text-xs text-sand-11">{alert.timestamp}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <Eye className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function AdminDashboard() {
  const [data] = useState(mockData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sand-12">Admin Dashboard</h1>
          <p className="text-sand-11">Monitor compliance and manage your organization</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <Shield className="w-4 h-4" />
            Run Compliance Check
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Staff"
          value={data.overview.totalStaff}
          icon={Users}
          trend="neutral"
        />
        <StatCard
          title="Compliant Staff"
          value={data.overview.compliantStaff}
          change={data.overview.complianceChange}
          icon={CheckCircle2}
          trend="up"
          description="vs last month"
        />
        <StatCard
          title="Pending Documents"
          value={data.overview.pendingDocuments}
          icon={FileCheck}
          trend="neutral"
        />
        <StatCard
          title="Expiring Soon"
          value={data.overview.expiringSoon}
          icon={AlertTriangle}
          trend="down"
          description="next 30 days"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance by Department */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-sand-12">Compliance by Department</h3>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <div className="space-y-4">
              {data.complianceByDepartment.map((dept) => (
                <div key={dept.department} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sand-12">{dept.department}</span>
                    <span className="text-sm text-sand-11">
                      {dept.compliant}/{dept.total} ({dept.rate}%)
                    </span>
                  </div>
                  <div className="w-full bg-sand-3 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dept.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-sand-12">Recent Alerts</h3>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {data.recentAlerts.length} Active
              </Badge>
            </div>
            <div className="space-y-4">
              {data.recentAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-sand-12">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            View All Activity
          </Button>
        </div>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-4 border border-sand-6 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'approved' ? 'bg-green-500' : 
                activity.status === 'pending' ? 'bg-yellow-500' : 'bg-sand-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-sand-12">
                  <span className="text-blue-600">{activity.staff}</span> {activity.action.toLowerCase()}
                </p>
                <p className="text-sm text-sand-11">{activity.document}</p>
              </div>
              <div className="text-right">
                <Badge variant={activity.status === 'approved' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
                <p className="text-xs text-sand-11 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 