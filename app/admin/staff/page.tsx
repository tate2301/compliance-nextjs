"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Filter,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Plus,
  Mail,
  Phone
} from "lucide-react";

// Mock staff data
const mockStaff = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    phone: "+44 7700 900123",
    department: "Nursing",
    role: "Senior Nurse",
    complianceStatus: "compliant",
    compliancePercentage: 95,
    profileImage: null,
    lastActive: "2024-01-15",
    documentsStatus: {
      dbs: { status: "expiring", expiryDate: "2024-02-15" },
      rightToWork: { status: "valid", expiryDate: "2025-06-30" },
      professionalReg: { status: "valid", expiryDate: "2024-12-31" },
      training: { status: "overdue", expiryDate: "2024-01-10" }
    }
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    phone: "+44 7700 900124",
    department: "Support Staff",
    role: "Healthcare Assistant",
    complianceStatus: "non-compliant",
    compliancePercentage: 65,
    profileImage: null,
    lastActive: "2024-01-14",
    documentsStatus: {
      dbs: { status: "valid", expiryDate: "2025-03-20" },
      rightToWork: { status: "missing", expiryDate: null },
      professionalReg: { status: "not-required", expiryDate: null },
      training: { status: "valid", expiryDate: "2024-08-15" }
    }
  },
  {
    id: 3,
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@company.com",
    phone: "+44 7700 900125",
    department: "Administration",
    role: "HR Manager",
    complianceStatus: "compliant",
    compliancePercentage: 100,
    profileImage: null,
    lastActive: "2024-01-15",
    documentsStatus: {
      dbs: { status: "valid", expiryDate: "2025-11-15" },
      rightToWork: { status: "valid", expiryDate: "2026-01-01" },
      professionalReg: { status: "not-required", expiryDate: null },
      training: { status: "valid", expiryDate: "2024-09-30" }
    }
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@company.com",
    phone: "+44 7700 900126",
    department: "Maintenance",
    role: "Facilities Manager",
    complianceStatus: "pending",
    compliancePercentage: 80,
    profileImage: null,
    lastActive: "2024-01-13",
    documentsStatus: {
      dbs: { status: "pending", expiryDate: null },
      rightToWork: { status: "valid", expiryDate: "2024-12-31" },
      professionalReg: { status: "not-required", expiryDate: null },
      training: { status: "valid", expiryDate: "2024-07-20" }
    }
  }
];

function getComplianceStatusColor(status: string) {
  switch (status) {
    case 'compliant': return 'bg-green-100 text-green-800 border-green-200';
    case 'non-compliant': return 'bg-red-100 text-red-800 border-red-200';
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-sand-100 text-sand-800 border-sand-200';
  }
}

function getDocumentStatusIcon(status: string) {
  switch (status) {
    case 'valid': return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    case 'expiring': return <Clock className="w-4 h-4 text-orange-600" />;
    case 'overdue': return <XCircle className="w-4 h-4 text-red-600" />;
    case 'missing': return <AlertTriangle className="w-4 h-4 text-red-600" />;
    case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
    case 'not-required': return <div className="w-4 h-4 bg-sand-300 rounded-full" />;
    default: return <div className="w-4 h-4 bg-sand-300 rounded-full" />;
  }
}

function StaffCard({ staff }: { staff: any }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-sand-6 flex items-center justify-center">
            {staff.profileImage ? (
              <img 
                src={staff.profileImage} 
                alt={`${staff.firstName} ${staff.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-medium text-sand-11">
                {staff.firstName[0]}{staff.lastName[0]}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-sand-12">
              {staff.firstName} {staff.lastName}
            </h3>
            <p className="text-sm text-sand-11">{staff.role} • {staff.department}</p>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1 text-xs text-sand-11">
                <Mail className="w-3 h-3" />
                {staff.email}
              </div>
              <div className="flex items-center gap-1 text-xs text-sand-11">
                <Phone className="w-3 h-3" />
                {staff.phone}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="outline" className={getComplianceStatusColor(staff.complianceStatus)}>
            {staff.complianceStatus}
          </Badge>
          <p className="text-sm text-sand-11 mt-1">{staff.compliancePercentage}% compliant</p>
        </div>
      </div>

      {/* Document Status */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-sand-12">Document Status</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            {getDocumentStatusIcon(staff.documentsStatus.dbs.status)}
            <span className="text-sm text-sand-11">DBS</span>
          </div>
          <div className="flex items-center gap-2">
            {getDocumentStatusIcon(staff.documentsStatus.rightToWork.status)}
            <span className="text-sm text-sand-11">Right to Work</span>
          </div>
          <div className="flex items-center gap-2">
            {getDocumentStatusIcon(staff.documentsStatus.professionalReg.status)}
            <span className="text-sm text-sand-11">Professional Reg</span>
          </div>
          <div className="flex items-center gap-2">
            {getDocumentStatusIcon(staff.documentsStatus.training.status)}
            <span className="text-sm text-sand-11">Training</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-sand-6">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          View Profile
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>
    </Card>
  );
}

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [complianceFilter, setComplianceFilter] = useState("all");
  const [staff] = useState(mockStaff);

  const departments = useMemo(() => {
    const unique = Array.from(new Set(staff.map(s => s.department)));
    return ["all", ...unique];
  }, [staff]);

  const filteredStaff = useMemo(() => {
    return staff.filter(person => {
      const matchesSearch = 
        person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === "all" || person.department === departmentFilter;
      const matchesCompliance = complianceFilter === "all" || person.complianceStatus === complianceFilter;
      
      return matchesSearch && matchesDepartment && matchesCompliance;
    });
  }, [staff, searchTerm, departmentFilter, complianceFilter]);

  const stats = useMemo(() => {
    const total = staff.length;
    const compliant = staff.filter(s => s.complianceStatus === 'compliant').length;
    const nonCompliant = staff.filter(s => s.complianceStatus === 'non-compliant').length;
    const pending = staff.filter(s => s.complianceStatus === 'pending').length;
    
    return { total, compliant, nonCompliant, pending };
  }, [staff]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sand-12">Staff Management</h1>
          <p className="text-sand-11">Manage staff members and monitor compliance status</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Staff List
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-sand-11">Total Staff</p>
              <p className="text-2xl font-bold text-sand-12">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm font-medium text-sand-11">Compliant</p>
              <p className="text-2xl font-bold text-sand-12">{stats.compliant}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm font-medium text-sand-11">Non-Compliant</p>
              <p className="text-2xl font-bold text-sand-12">{stats.nonCompliant}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-sand-11">Pending</p>
              <p className="text-2xl font-bold text-sand-12">{stats.pending}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -transand-y-1/2 text-sand-11 w-4 h-4" />
              <Input
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </Select>
            <Select value={complianceFilter} onValueChange={setComplianceFilter}>
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="pending">Pending</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStaff.map((person) => (
          <StaffCard key={person.id} staff={person} />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-12 h-12 text-sand-6 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sand-12 mb-2">No staff found</h3>
          <p className="text-sand-11">Try adjusting your search or filter criteria.</p>
        </Card>
      )}
    </div>
  );
} 