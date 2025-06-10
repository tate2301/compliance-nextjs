"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Shield, 
  Search, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Users,
  Activity
} from "lucide-react";

// Mock compliance data
const mockComplianceData = {
  overview: {
    overallCompliance: 82.5,
    complianceChange: -2.1,
    criticalIssues: 8,
    expiringSoon: 23,
    pendingReviews: 12,
    lastUpdated: "2024-01-15T10:30:00Z"
  },
  departmentCompliance: [
    {
      department: "Nursing",
      compliance: 89.2,
      change: 1.5,
      staff: 89,
      issues: ["3 DBS expiring soon", "1 training overdue"],
      trend: "up"
    },
    {
      department: "Support Staff", 
      compliance: 76.8,
      change: -3.2,
      staff: 67,
      issues: ["5 missing documents", "2 training overdue"],
      trend: "down"
    },
    {
      department: "Administration",
      compliance: 95.6,
      change: 0.8,
      staff: 45,
      issues: ["1 professional registration expiring"],
      trend: "up"
    },
    {
      department: "Management",
      compliance: 100,
      change: 0,
      staff: 23,
      issues: [],
      trend: "neutral"
    },
    {
      department: "Maintenance",
      compliance: 71.4,
      change: -1.8,
      staff: 21,
      issues: ["4 missing DBS", "2 training overdue"],
      trend: "down"
    }
  ],
  documentTypes: [
    {
      type: "DBS Certificate",
      required: 245,
      valid: 198,
      expiring: 12,
      expired: 8,
      missing: 27,
      compliance: 80.8
    },
    {
      type: "Right to Work",
      required: 245,
      valid: 215,
      expiring: 5,
      expired: 3,
      missing: 22,
      compliance: 87.8
    },
    {
      type: "Professional Registration",
      required: 134,
      valid: 118,
      expiring: 8,
      expired: 2,
      missing: 6,
      compliance: 88.1
    },
    {
      type: "Training Certificates",
      required: 245,
      valid: 189,
      expiring: 15,
      expired: 12,
      missing: 29,
      compliance: 77.1
    }
  ],
  recentIssues: [
    {
      id: 1,
      type: "critical",
      title: "DBS Certificate Expired",
      description: "John Smith's DBS certificate expired 3 days ago",
      staff: "John Smith",
      department: "Nursing",
      daysOverdue: 3,
      timestamp: "2024-01-12T09:00:00Z"
    },
    {
      id: 2,
      type: "warning",
      title: "Training Due Soon",
      description: "Fire Safety training expires in 5 days for 8 staff members",
      staff: "Multiple",
      department: "Various",
      daysRemaining: 5,
      timestamp: "2024-01-10T14:30:00Z"
    },
    {
      id: 3,
      type: "high",
      title: "Missing Right to Work",
      description: "Sarah Johnson has not submitted right to work documentation",
      staff: "Sarah Johnson",
      department: "Support Staff",
      daysPending: 12,
      timestamp: "2024-01-03T11:15:00Z"
    }
  ]
};

function ComplianceCard({ title, value, change, icon: Icon, description, trend }: {
  title: string;
  value: string | number;
  change?: number;
  icon: any;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}) {
  const getTrendColor = () => {
    if (!trend || trend === 'neutral') return 'text-sand-11';
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = () => {
    if (!trend || trend === 'neutral') return null;
    return trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
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

function DepartmentComplianceCard({ department }: { department: any }) {
  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return 'text-green-600';
    if (compliance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = () => {
    switch (department.trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-sand-12">{department.department}</h3>
          <p className="text-sm text-sand-11">{department.staff} staff members</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getComplianceColor(department.compliance)}`}>
              {department.compliance}%
            </span>
            {getTrendIcon()}
          </div>
          <p className="text-sm text-sand-11">
            {department.change > 0 ? '+' : ''}{department.change}% vs last month
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-sand-3 rounded-full h-3 mb-4">
        <div 
          className={`h-3 rounded-full transition-all duration-300 ${
            department.compliance >= 90 ? 'bg-green-500' :
            department.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${department.compliance}%` }}
        />
      </div>

      {/* Issues */}
      {department.issues.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-sand-12">Current Issues</h4>
          {department.issues.map((issue, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-sand-11">
              <AlertTriangle className="w-3 h-3 text-orange-500" />
              {issue}
            </div>
          ))}
        </div>
      )}

      {department.issues.length === 0 && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle2 className="w-4 h-4" />
          No current issues
        </div>
      )}
    </Card>
  );
}

function DocumentTypeCard({ documentType }: { documentType: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'missing': return 'bg-sand-100 text-sand-800';
      default: return 'bg-sand-100 text-sand-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-sand-12">{documentType.type}</h3>
        <span className="text-2xl font-bold text-sand-12">{documentType.compliance}%</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{documentType.valid}</div>
          <div className="text-sm text-sand-11">Valid</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{documentType.expiring}</div>
          <div className="text-sm text-sand-11">Expiring</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{documentType.expired}</div>
          <div className="text-sm text-sand-11">Expired</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-sand-600">{documentType.missing}</div>
          <div className="text-sm text-sand-11">Missing</div>
        </div>
      </div>

      <div className="w-full bg-sand-3 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${documentType.compliance}%` }}
        />
      </div>
    </Card>
  );
}

function IssueCard({ issue }: { issue: any }) {
  const getIssueTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-sand-100 text-sand-800 border-sand-200';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-sand-600" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 border border-sand-6 rounded-lg">
      <div className="mt-0.5">
        {getIcon(issue.type)}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-sand-12">{issue.title}</h4>
        <p className="text-sm text-sand-11 mt-1">{issue.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <Badge variant="outline" className={getIssueTypeColor(issue.type)}>
            {issue.type}
          </Badge>
          <span className="text-xs text-sand-11">{issue.department}</span>
          <span className="text-xs text-sand-11">
            {new Date(issue.timestamp).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <FileText className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function ComplianceMonitoring() {
  const [data] = useState(mockComplianceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [issueTypeFilter, setIssueTypeFilter] = useState("all");

  const filteredIssues = useMemo(() => {
    return data.recentIssues.filter(issue => {
      const matchesSearch = 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.staff.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === "all" || issue.department === departmentFilter;
      const matchesType = issueTypeFilter === "all" || issue.type === issueTypeFilter;
      
      return matchesSearch && matchesDepartment && matchesType;
    });
  }, [data.recentIssues, searchTerm, departmentFilter, issueTypeFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sand-12">Compliance Monitoring</h1>
          <p className="text-sand-11">Monitor organizational compliance and manage issues</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <Activity className="w-4 h-4" />
            Run Audit
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ComplianceCard
          title="Overall Compliance"
          value={`${data.overview.overallCompliance}%`}
          change={data.overview.complianceChange}
          icon={Shield}
          trend={data.overview.complianceChange > 0 ? 'up' : 'down'}
          description="vs last month"
        />
        <ComplianceCard
          title="Critical Issues"
          value={data.overview.criticalIssues}
          icon={XCircle}
          trend="neutral"
        />
        <ComplianceCard
          title="Expiring Soon"
          value={data.overview.expiringSoon}
          icon={Clock}
          description="next 30 days"
          trend="neutral"
        />
        <ComplianceCard
          title="Pending Reviews"
          value={data.overview.pendingReviews}
          icon={FileText}
          trend="neutral"
        />
      </div>

      {/* Department Compliance */}
      <div>
        <h2 className="text-xl font-semibold text-sand-12 mb-4">Department Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.departmentCompliance.map((dept) => (
            <DepartmentComplianceCard key={dept.department} department={dept} />
          ))}
        </div>
      </div>

      {/* Document Types */}
      <div>
        <h2 className="text-xl font-semibold text-sand-12 mb-4">Document Type Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.documentTypes.map((docType) => (
            <DocumentTypeCard key={docType.type} documentType={docType} />
          ))}
        </div>
      </div>

      {/* Recent Issues */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-sand-12">Recent Issues</h2>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {data.recentIssues.length} Active Issues
          </Badge>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -transand-y-1/2 text-sand-11 w-4 h-4" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <option value="all">All Departments</option>
                <option value="Nursing">Nursing</option>
                <option value="Support Staff">Support Staff</option>
                <option value="Administration">Administration</option>
                <option value="Maintenance">Maintenance</option>
              </Select>
              <Select value={issueTypeFilter} onValueChange={setIssueTypeFilter}>
                <option value="all">All Types</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="warning">Warning</option>
              </Select>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sand-12 mb-2">No issues found</h3>
            <p className="text-sand-11">All compliance requirements are being met or no issues match your filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
} 