import React, { useState, useMemo, useEffect } from 'react';
import {
  Heart, Activity, Brain, ShieldAlert, FlaskConical, Stethoscope,
  Settings, Truck, Briefcase, Users, LayoutDashboard, Search,
  Bell, Menu, X, ChevronRight, ChevronDown, ClipboardList,
  Droplets, Zap, Building2, Pill, Syringe, Baby, UserPlus,
  FileText, CreditCard, Radio, Wrench, History, HardDrive,
  TestTube, Beaker, ClipboardCheck, AlertTriangle, Clock, TrendingUp,
  ShieldCheck, Contact, ConciergeBell, Microscope, UserCog, Calendar,
  Network, GitBranch, Layers, Medal, Shield, Command, Globe, CheckCircle2,
  Filter, MoreHorizontal, Phone, Mail, DollarSign, Scissors, Target, Cpu,
  UserCheck, HeartPulse, Sparkles, Box, PieChart, Timer, ListChecks, Lock,
  User, ArrowRight, Sun, Sunrise, Moon, BarChart3, AlertCircle, TrendingDown,
  FileSearch, RefreshCw, MapPin, Fingerprint, Info, ChevronUp, Link, BadgeCheck,
  GraduationCap, Star, Key, Landmark, Workflow, Boxes, MessageSquare, Award,
  Archive, Package, ShieldAlert as AlertIcon, Video, Mic, Monitor, Wifi, CalendarCheck, Check,
  XCircle, CheckSquare, Ambulance, Navigation, Siren
} from 'lucide-react';

// BRAND COLORS: #0F766E (Primary Teal), #FFFFFF (Cards/Workspace), #0F172A (Primary Text)

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Stock Alert', msg: 'Paracetamol 500mg below threshold (450 units).', time: '10m ago', type: 'alert', icon: AlertTriangle },
  { id: 2, title: 'New Registration', msg: 'Patient Sarah Jenkins added to IVF queue.', time: '25m ago', type: 'info', icon: UserPlus },
  { id: 3, title: 'Lab Results', msg: 'Hematology report ready for ID #P10-9924.', time: '1h ago', type: 'success', icon: FlaskConical },
  { id: 4, title: 'System Update', msg: 'HIMS maintenance scheduled for 2:00 AM.', time: '2h ago', type: 'warning', icon: Settings },
  { id: 5, title: 'Shift Handover', msg: 'Nursing station B shift report pending.', time: '3h ago', type: 'alert', icon: ClipboardList },
];

const MOCK_AMBULANCES = [
  { id: 'AMB-01', plate: 'KA-05-MV-9921', driver: 'Rajesh Kumar', contact: '+91 98765 11111', status: 'Available', type: 'ALS (Advanced)', location: 'Station A', eta: 'N/A' },
  { id: 'AMB-02', plate: 'KA-05-MV-9922', driver: 'Suresh P', contact: '+91 98765 22222', status: 'On Mission', type: 'BLS (Basic)', location: 'En route to MG Road', eta: '12 mins' },
  { id: 'AMB-03', plate: 'KA-01-EQ-8812', driver: 'Manoj T', contact: '+91 98765 33333', status: 'Maintenance', type: 'ICU Mobile', location: 'Workshop', eta: 'N/A' },
  { id: 'AMB-04', plate: 'KA-04-JF-7721', driver: 'Vikram Singh', contact: '+91 98765 44444', status: 'Available', type: 'ALS (Advanced)', location: 'Station B', eta: 'N/A' },
  { id: 'AMB-05', plate: 'KA-03-AX-4411', driver: 'Arun Gowda', contact: '+91 98765 55555', status: 'On Mission', type: 'Neo-Natal', location: 'Returning to Base', eta: '4 mins' },
];

const DOCTOR_DATA = [
  {
    dept: 'IVF & Reproductive Medicine',
    doctors: [
      { name: 'Dr. Sabine S', role: 'Medical Director', qual: 'MBBS, MD, DRM', exp: '20+ Years', status: 'Available', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', bio: 'Dr. Sabine is a pioneer in reproductive medicine with over two decades of experience in complex IVF cases. Under her leadership, Project 10 has achieved a 75% success rate in assisted reproduction.' },
      { name: 'Dr. Mahalakshmi B', role: 'Senior Consultant', qual: 'MBBS, DGO, DRM', exp: '15+ Years', status: 'In OT', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=300', bio: 'Expert in hysteroscopic and laparoscopic surgeries. Dr. Mahalakshmi specializes in advanced fertility treatments and has managed over 5,000 successful cycles.' },
      { name: 'Dr. Maria Jerome', role: 'Consultant', qual: 'MBBS, MS (OBG)', exp: '10+ Years', status: 'Available', img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300', bio: 'Specializes in high-risk obstetrics and fetal medicine. She is known for her compassionate approach toward maternal healthcare and prenatal diagnostics.' }
    ]
  },
  {
    dept: 'Obstetrics & Gynaecology',
    doctors: [
      { name: 'Dr. Anju Aravindan', role: 'Senior Consultant', qual: 'MBBS, MD (OBG)', exp: '12+ Years', status: 'Available', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300', bio: 'Renowned for her expertise in pain-free labor and cosmetic gynecology. Dr. Anju leads the "Birth with Dignity" initiative at Project 10.' },
      { name: 'Dr. Arathy Haridas', role: 'Consultant', qual: 'MBBS, DGO', exp: '8+ Years', status: 'On Leave', img: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300', bio: 'Expert in adolescent health and menopausal management. She is a frequent speaker at national gynecological conferences.' },
      { name: 'Dr. Asha Mary Thomas', role: 'Senior Consultant', qual: 'MBBS, MS', exp: '14+ Years', status: 'Available', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=300', bio: 'Specialist in gynecological oncology and robotic surgeries. Committed to providing comprehensive cancer screening and surgical management for women.' },
    ]
  }
];

const PHARMACY_STOCK = [
  { id: 'STK-001', name: 'Paracetamol 500mg', category: 'Medicines', batch: 'BT-9921', expiry: '12/2026', stock: 450, unit: 'Tabs', status: 'In Stock' },
  { id: 'STK-002', name: 'Amoxicillin 250mg', category: 'Medicines', batch: 'BT-4412', expiry: '08/2025', stock: 120, unit: 'Syrup', status: 'Low Stock' },
  { id: 'STK-003', name: 'IVF Stimulation Kit', category: 'IVF Kits', batch: 'IVF-882', expiry: '10/2025', stock: 25, unit: 'Sets', status: 'In Stock' },
  { id: 'STK-004', name: 'Surgical Gloves (Size 7)', category: 'Surgical', batch: 'SG-1102', expiry: '01/2028', stock: 0, unit: 'Pairs', status: 'Out of Stock' },
  { id: 'STK-005', name: 'Normal Saline 500ml', category: 'Fluids', batch: 'FL-2231', expiry: '05/2027', stock: 890, unit: 'Bottles', status: 'In Stock' },
  { id: 'STK-006', name: 'Cetirizine 10mg', category: 'Medicines', batch: 'BT-3320', expiry: '03/2026', stock: 15, unit: 'Tabs', status: 'Low Stock' },
  { id: 'STK-007', name: 'Syringes 5ml', category: 'Consumables', batch: 'CS-4451', expiry: 'N/A', stock: 1200, unit: 'Units', status: 'In Stock' },
  { id: 'STK-008', name: 'Progesterone Inj', category: 'IVF Kits', batch: 'IVF-112', expiry: '09/2025', stock: 82, unit: 'Vials', status: 'In Stock' },
];

const MODULES = [
  {
    id: 'clinical',
    name: 'Clinical Services',
    icon: Stethoscope,
    subsets: [
      { id: 'cli-cardiac', name: 'Cardiac Sciences', segments: ['Non-Invasive Cardiology', 'Interventional Cardiology', 'Electrophysiology (EP)', 'Heart Failure Clinic', 'Preventive Cardiology', 'Pediatric Cardiology'] },
      { id: 'cli-neuro', name: 'Neurosciences', segments: ['Neurology', 'Neurosurgery', 'Neuro-Radiology'] },
      { id: 'cli-onco', name: 'Oncology', segments: ['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Nuclear Medicine', 'Psycho-Oncology', 'Pain & Palliative', 'Tumor Board'] },
      { id: 'cli-ortho', name: 'Orthopedics', segments: ['Arthroplasty Unit', 'Arthroscopy & Sports', 'Spine Surgery', 'Hand Surgery', 'Pediatric Orthopedics'] },
      { id: 'cli-gastro', name: 'Gastroenterology', segments: ['Endoscopy Suite', 'Liver Clinic', 'IBD Clinic', 'Motility Clinic'] },
      { id: 'cli-wom', name: 'Woman & Child', segments: ['Fetal Medicine', 'High-Risk Pregnancy', 'Birthing Suites', 'IVF & Reproductive', 'Lactation', 'Child Development', 'Pediatric Specialties'] },
      { id: 'cli-spec', name: 'Specialized Clinics', segments: ['Doctor Directory', 'Hyperbaric Medicine', 'Podiatry', 'Sleep Medicine', 'Travel Medicine', 'Geriatrics'] }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics & Pharmacy',
    icon: Truck,
    subsets: [
      { id: 'log-sup', name: 'Supply Chain', segments: ['P10 Apothecary', 'Purchase', 'Central Stores', 'Pharmacy Stores', 'Surgical Stores'] },
      { id: 'log-trans', name: 'Transport', segments: ['Ambulance Fleet', 'Vehicle Maintenance', 'Driver Roster'] },
      { id: 'log-cssd', name: 'CSSD', segments: ['Decontamination', 'Assembly & Packing', 'Sterilization', 'Sterile Storage'] },
      { id: 'log-fb', name: 'Food & Beverage', segments: ['Dietary Kitchen', 'Cafeteria', 'Pantry Services'] },
    ]
  },
  {
    id: 'diagnostics',
    name: 'Diagnostic',
    icon: Microscope,
    subsets: [
      { id: 'diag-lab', name: 'Laboratory', segments: ['Central Lab', 'Biochemistry', 'Hematology', 'Microbiology', 'Histopathology', 'Molecular Biology', 'Cytogenetics', 'HLA Typing'] },
      { id: 'diag-img', name: 'Imaging', segments: ['Radiography', 'Fluoroscopy', 'Mammography', 'BMD', 'Interventional Radiology', 'PACS Admin'] }
    ]
  },
  {
    id: 'admin',
    name: 'Administration',
    icon: Building2,
    subsets: [
      { id: 'adm-ops', name: 'Ops & Quality', segments: ['Project 10 Organogram', 'Quality Assurance', 'Infection Control', 'Medical Records'] },
      { id: 'adm-hr', name: 'HR', segments: ['Talent Acquisition', 'Payroll', 'Training', 'Employee Health', 'Creche'] },
      { id: 'adm-fin', name: 'Finance', segments: ['Billing', 'Insurance Desk', 'AP/AR', 'Internal Audit', 'Financial Statements', 'Revenue MIS'] },
      { id: 'adm-it', name: 'IT & Digital', segments: ['HIMS Team', 'Network & Hardware', 'Telemedicine', 'Data Security'] },
    ]
  },
  {
    id: 'patient',
    name: 'Patient Services',
    icon: ConciergeBell,
    subsets: [
      { id: 'pat-exp', name: 'Experience', segments: ['New Patient Entry', 'Front Office', 'International Care', 'Concierge Services', 'Pastoral Care', 'Mortuary Services'] }
    ]
  }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedDepts, setExpandedDepts] = useState(['clinical', 'logistics']);
  const [expandedSubsets, setExpandedSubsets] = useState(['cli-spec', 'log-sup', 'log-trans']);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    if (selectedDoctor) {
      return <DoctorProfileView doctor={selectedDoctor} onBack={() => setSelectedDoctor(null)} />;
    }

    if (selectedSegment) {
      if (selectedSegment.name === 'Project 10 Organogram') return <OrganogramView onBack={() => setSelectedSegment(null)} />;
      if (selectedSegment.name === 'Doctor Directory') return <DoctorDirectoryView onBack={() => setSelectedSegment(null)} onSelectDoctor={setSelectedDoctor} />;
      if (selectedSegment.name === 'New Patient Entry') return <NewPatientForm onBack={() => setSelectedSegment(null)} />;
      if (selectedSegment.name === 'P10 Apothecary') return <ApothecaryHubView onBack={() => setSelectedSegment(null)} />;
      if (selectedSegment.name === 'Ambulance Fleet') return <AmbulanceFleetView onBack={() => setSelectedSegment(null)} />;
      if (selectedSegment.name === 'UserProfile') return <UserProfileView onBack={() => setSelectedSegment(null)} />;
      if (selectedSegment.parent === 'Laboratory' || selectedSegment.name === 'Central Lab') return <LaboratoryDashboard segment={selectedSegment} onBack={() => setSelectedSegment(null)} />;

      return <GenericSegmentDashboard segment={selectedSegment} onBack={() => setSelectedSegment(null)} />;
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardOverview onSelectSegment={setSelectedSegment} currentTime={time} />;
      default: return <PlaceholderContent tab={activeTab} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans no-scrollbar selection:bg-teal-100 selection:text-teal-900 animate-in fade-in zoom-in-95 duration-1000">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      <aside className={`${sidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 bg-white flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-slate-100`}>
        <div className="p-6 flex items-center gap-4 border-b border-slate-50">
          <div className="bg-[#0F766E] p-2.5 rounded-xl shadow-lg shadow-teal-900/20 group cursor-pointer hover:scale-105 transition-transform" onClick={() => { setActiveTab('dashboard'); setSelectedSegment(null); setSelectedDoctor(null); }}>
            <Activity className="text-white w-6 h-6" />
          </div>
          {sidebarOpen && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-500 cursor-pointer" onClick={() => { setActiveTab('dashboard'); setSelectedSegment(null); setSelectedDoctor(null); }}>
              <h1 className="text-xl font-black text-[#0F766E] tracking-tighter leading-none uppercase">Project 10</h1>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[3px] mt-1">Hospitals</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-6 no-scrollbar px-4 space-y-1.5">
          <NavItem icon={LayoutDashboard} label="Command Center" active={activeTab === 'dashboard' && !selectedSegment} collapsed={!sidebarOpen} onClick={() => { setActiveTab('dashboard'); setSelectedSegment(null); setSelectedDoctor(null); }} />
          <div className="pt-6 pb-2 px-4 text-[9px] font-black text-slate-300 uppercase tracking-[3px]">{sidebarOpen ? 'Operations' : '---'}</div>
          {MODULES.map((dept) => (
            <div key={dept.id} className="mb-0.5">
              <button onClick={() => { if (!sidebarOpen) { setActiveTab(dept.id); setSelectedSegment(null); } else setExpandedDepts(prev => prev.includes(dept.id) ? prev.filter(id => id !== dept.id) : [...prev, dept.id]); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === dept.id ? 'bg-slate-50 text-[#0F766E] font-bold' : 'hover:bg-slate-50/50 text-slate-500'}`}>
                <div className="flex items-center gap-3.5"><dept.icon size={18} className={activeTab === dept.id ? 'text-[#0F766E]' : 'text-slate-400'} /><span className={`font-bold text-[12.5px] tracking-tight ${sidebarOpen ? 'block' : 'hidden'}`}>{dept.name}</span></div>
                {sidebarOpen && (expandedDepts.includes(dept.id) ? <ChevronDown size={14} className="text-slate-300" /> : <ChevronRight size={14} className="text-slate-300" />)}
              </button>
              {sidebarOpen && expandedDepts.includes(dept.id) && (
                <div className="mt-1 space-y-0.5 ml-5 pl-3 border-l border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
                  {dept.subsets.map(sub => (
                    <div key={sub.id} className="py-0.5">
                      <button onClick={() => setExpandedSubsets(prev => prev.includes(sub.id) ? prev.filter(id => id !== sub.id) : [...prev, sub.id])} className="w-full flex items-center justify-between py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0F766E] transition-colors">{sub.name}</button>
                      {expandedSubsets.includes(sub.id) && (
                        <div className="space-y-0.5 mt-1 pb-1">
                          {sub.segments.map(seg => (
                            <button key={seg} onClick={() => { setSelectedSegment({ name: seg, parent: sub.name }); setActiveTab(dept.id); setSelectedDoctor(null); }} className={`w-full text-left py-1.5 px-3 text-[11px] font-bold rounded-lg transition-all flex items-center gap-2 group ${selectedSegment?.name === seg ? 'text-[#0F766E] bg-teal-50' : 'text-slate-500 hover:text-[#0F766E] hover:bg-slate-50'}`}>
                              <div className={`w-1 h-1 rounded-full transition-all ${selectedSegment?.name === seg ? 'bg-[#0F766E]' : 'bg-slate-200 group-hover:bg-[#0F766E]'}`}></div>{seg}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <div onClick={() => setSelectedSegment({ name: 'UserProfile', parent: 'Account' })} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:bg-white hover:border-[#0F766E]/20">
            <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center text-white font-black text-[10px]">AD</div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-[11px] font-black text-slate-800 truncate uppercase tracking-tighter leading-none group-hover:text-[#0F766E] transition-colors">Director</p>
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-1">HQ Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-10 shadow-sm relative">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2.5 hover:bg-slate-50 rounded-xl text-[#0F766E] transition-all"><Menu size={20} /></button>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0F766E]" size={16} />
              <input type="text" placeholder="OmniSearch records..." className="pl-11 pr-6 py-2.5 bg-slate-50 border-none rounded-xl text-sm w-80 focus:ring-2 focus:ring-[#0F766E]/5 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <p className="text-[11px] font-black text-[#0F766E] tracking-widest leading-none">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{time.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-2xl text-[9px] font-black border border-emerald-100 tracking-[1.5px] uppercase"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-100"></div>LIVE SYNC</div>

            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2.5 rounded-xl relative transition-all border shadow-sm ${showNotifications ? 'bg-[#0F766E] text-white border-teal-800' : 'bg-white hover:bg-slate-50 text-slate-400 hover:text-[#0F766E] border-slate-100'}`}>
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
            </div>

            <button onClick={() => setIsLoggedIn(false)} className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center text-white font-black text-xs shadow-md hover:scale-105 transition-all">AD</button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-white">{renderContent()}</div>
      </main>
    </div>
  );

  function NavItem({ icon: Icon, label, active, onClick, collapsed }) {
    return (
      <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative group ${active ? 'bg-[#0F766E] text-white shadow-xl shadow-teal-900/40' : 'text-slate-500 hover:bg-slate-50 hover:text-[#0F766E]'}`}>
        <Icon size={18} className={`${active ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
        {!collapsed && <span className="font-bold text-[13px] tracking-tight">{label}</span>}
      </button>
    );
  }
}

// AMBULANCE FLEET VIEW
function AmbulanceFleetView({ onBack }) {
  const [activeTracking, setActiveTracking] = useState(null);

  const handleCallDriver = (name) => {
    // Simulated call action
    alert(`Calling ${name}...`);
  };

  return (
    <div className="p-10 max-w-screen-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 no-scrollbar pb-40 relative">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-3">
          <button onClick={onBack} className="text-[#0F766E] font-black text-[11px] uppercase tracking-[4px] flex items-center gap-2 hover:translate-x-[-5px] transition-all"><ChevronRight size={16} className="rotate-180" /> Transport Hub</button>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none flex items-center gap-6"><div className="p-3.5 bg-[#0F766E] text-white rounded-[1.5rem] shadow-2xl"><Ambulance size={36} /></div>Emergency <span className="text-[#0F766E]">Fleet</span></h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search Vehicle ID..."
              className="pl-14 pr-8 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm w-80 shadow-2xl focus:ring-4 focus:ring-[#0F766E]/5 outline-none font-bold placeholder:text-slate-200 text-slate-900"
            />
          </div>
          <button className="p-4 bg-[#0F766E] text-white rounded-full shadow-lg shadow-teal-900/20 hover:scale-110 active:scale-95 transition-all">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKPI label="Total Fleet" value="12" icon={Ambulance} trend="Active" color="slate" />
        <ModernKPI label="On Mission" value="4" icon={Siren} trend="Urgent" color="rose" critical />
        <ModernKPI label="Available" value="6" icon={CheckCircle2} trend="Ready" color="slate" />
        <ModernKPI label="Maintenance" value="2" icon={Wrench} trend="Service" color="slate" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {MOCK_AMBULANCES.map((amb) => (
          <div key={amb.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-2 shadow-xl shadow-slate-200/50 group relative overflow-hidden transition-all hover:-translate-y-1">
            <div className="p-6 pb-2 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl text-[#0F766E] border border-slate-100"><Ambulance size={24} /></div>
                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${amb.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    amb.status === 'On Mission' ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                  {amb.status}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{amb.plate}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{amb.type}</p>

              <div className="mt-6 space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                <div className="flex items-center gap-3">
                  <User size={14} className="text-slate-300" />
                  <span className="text-xs font-bold text-slate-700">{amb.driver}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-slate-300" />
                  <span className="text-xs font-bold text-slate-700">{amb.location}</span>
                </div>
                {amb.status === 'On Mission' && (
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-rose-400" />
                    <span className="text-xs font-black text-rose-500">ETA: {amb.eta}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-2 mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCallDriver(amb.driver)}
                className="py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-slate-100"
              >
                <Phone size={14} /> Call
              </button>
              <button
                onClick={() => setActiveTracking(amb)}
                className="py-3 bg-[#0F766E] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-teal-950 transition-all"
              >
                <Navigation size={14} /> Track
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeTracking && (
        <AmbulanceTrackingOverlay ambulance={activeTracking} onClose={() => setActiveTracking(null)} />
      )}
    </div>
  );
}

function AmbulanceTrackingOverlay({ ambulance, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-slate-100 pointer-events-auto">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{ambulance.plate}</h3>
            <p className="text-[10px] font-bold text-[#0F766E] uppercase tracking-widest mt-1">Live Telemetry</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><User size={14} /> {ambulance.driver}</div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-600"><Phone size={14} /> {ambulance.contact}</div>
            </div>
          </div>
          <button onClick={onClose} className="bg-white p-3 rounded-2xl shadow-lg text-slate-400 hover:text-rose-500 transition-all pointer-events-auto"><X size={24} /></button>
        </div>

        {/* Map Simulation */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden">
          {/* Map Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 200 500 Q 400 300 600 400 T 800 200" fill="none" stroke="#0F766E" strokeWidth="6" strokeLinecap="round" strokeDasharray="10,10" className="animate-pulse" />
          </svg>

          {/* Ambulance Marker */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-24 h-24 bg-[#0F766E]/20 rounded-full animate-ping absolute inset-0"></div>
              <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center relative border-4 border-white z-10">
                <Ambulance size={40} className="text-[#0F766E]" />
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap shadow-xl">
                {ambulance.location}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white border-t border-slate-100 p-6 flex justify-between items-center">
          <div className="flex gap-8">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Speed</p>
              <p className="text-xl font-black text-slate-900">62 <span className="text-xs text-slate-400">km/h</span></p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ETA</p>
              <p className="text-xl font-black text-slate-900">{ambulance.eta}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
              <p className={`text-xl font-black ${ambulance.status === 'On Mission' ? 'text-rose-500' : 'text-emerald-500'}`}>{ambulance.status}</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[4px] shadow-lg shadow-rose-500/30 transition-all flex items-center gap-3">
            <Phone size={16} /> Emergency Call
          </button>
        </div>
      </div>
    </div>
  );
}

// NOTIFICATION PANEL
function NotificationPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('all'); // all, alert, system

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-transparent" onClick={onClose}></div>
      <div className="absolute top-16 right-0 z-[70] w-96 bg-[#1e293b] rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border-[6px] border-white overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 origin-top-right">
        {/* Distinct Header */}
        <div className="p-6 bg-[#0F766E] flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <h3 className="text-white font-black text-lg tracking-tight leading-none">Notifications</h3>
            <p className="text-[10px] font-bold text-teal-100/80 uppercase tracking-widest mt-1">System Feed</p>
          </div>
          <button className="relative z-10 text-[9px] font-black bg-black/20 hover:bg-black/40 text-white px-3 py-1.5 rounded-lg uppercase tracking-widest transition-all backdrop-blur-sm flex items-center gap-2">
            Clear <CheckSquare size={10} />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-3 space-y-2">
          {MOCK_NOTIFICATIONS.map((note) => {
            const styles = {
              alert: 'bg-rose-500/10 border-rose-500/20 text-rose-200',
              warning: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
              success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
              info: 'bg-slate-800 border-slate-700 text-slate-300'
            };
            const Icon = note.icon;
            return (
              <div key={note.id} className={`p-4 rounded-2xl transition-all border ${styles[note.type]} hover:bg-white/5 cursor-pointer flex gap-4 relative group`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-black/20 shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-black text-white leading-tight">{note.title}</h4>
                    <span className="text-[9px] font-bold opacity-60 uppercase tracking-wide">{note.time}</span>
                  </div>
                  <p className="text-xs font-medium opacity-80 leading-relaxed line-clamp-2">{note.msg}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-[#1e293b] text-center">
          <button className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[3px] transition-all flex items-center justify-center gap-2 w-full py-2 hover:bg-slate-800 rounded-xl">View All Activity <ArrowRight size={12} /></button>
        </div>
      </div>
    </>
  );
}

// LOGIN SCREEN
function LoginScreen({ onLogin }) {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans no-scrollbar">
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 overflow-hidden border-r border-slate-100 bg-slate-50">
        <div className="absolute inset-0 z-0">
          {backgrounds.map((bg, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBg ? 'opacity-100' : 'opacity-0'}`}>
              <img src={bg} alt="Background" className="w-full h-full object-cover scale-105" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16 animate-in slide-in-from-left duration-700"><div className="bg-[#0F766E] p-3 rounded-2xl shadow-xl shadow-teal-900/20"><Activity className="text-white w-8 h-8" /></div><div><h1 className="text-3xl font-black text-[#0F766E] tracking-tighter leading-none uppercase">Project 10</h1><p className="text-[11px] font-black text-teal-400 uppercase tracking-[4px] mt-1">Hospitals Group</p></div></div>
          <div className="space-y-10 max-w-lg mt-24 animate-in slide-in-from-bottom duration-1000"><div className="space-y-2"><p className="text-[10px] font-black text-[#0F766E] uppercase tracking-[6px] opacity-80">Established 2010</p><h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight uppercase">A Legacy of <br />Healthcare <br /> Excellence</h2></div><p className="text-slate-600 text-2xl font-medium leading-relaxed italic border-l-4 border-[#0F766E] font-sans pl-8 py-3 max-w-md bg-white/50 backdrop-blur-sm rounded-r-xl">"Every heartbeat, every hope—we're here to turn your dream of parenthood into a reality."</p></div>
        </div>
        <div className="relative z-10 flex gap-12 border-t border-slate-200/50 pt-12 animate-in fade-in delay-500 duration-1000"><div className="space-y-1"><p className="text-4xl font-black text-[#0F766E] tracking-tighter leading-none">14+</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">Years of <br />Commitment</p></div><div className="space-y-1 border-l border-slate-200/50 pl-12"><p className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none text-[#0F766E]">Leading</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">IVF Facility <br />in India</p></div></div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white"><div className="w-full max-w-md space-y-12"><div className="text-center lg:text-left space-y-2"><h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Terminal Login</h3><p className="text-slate-400 text-sm font-bold uppercase tracking-widest opacity-60">Authentication Required</p></div><form onSubmit={onLogin} className="space-y-8"><div className="space-y-6"><div className="space-y-3"><label className="text-[10px] font-black text-slate-500 uppercase tracking-[4px] ml-4">Email ID</label><div className="relative group"><User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={18} /><input required type="email" placeholder="admin.hq@project10.com" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] text-sm font-bold focus:border-[#0F766E]/10 focus:bg-white transition-all outline-none text-slate-800" /></div></div><div className="space-y-3"><div className="flex justify-between items-center px-4"><label className="text-[10px] font-black text-slate-500 uppercase tracking-[4px]">Password</label><button type="button" className="text-[9px] font-black text-[#0F766E] uppercase tracking-widest hover:underline">Forgot Key?</button></div><div className="relative group"><Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={18} /><input required type="password" placeholder="••••••••••••" className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-[2rem] text-sm font-bold focus:border-[#0F766E]/10 focus:bg-white transition-all outline-none text-slate-800" /></div></div></div><button type="submit" className="w-full py-6 bg-[#0F766E] text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[6px] shadow-2xl hover:bg-teal-950 transition-all flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-[0.98]">Authorize Access <ArrowRight size={16} /></button></form></div></div>
    </div>
  );
}

// APOTHECARY HUB VIEW (Pharmacy + Inventory Management)
function ApothecaryHubView({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Items');

  const filteredStock = useMemo(() => {
    return PHARMACY_STOCK.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'All Items' || item.category === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, selectedFilter]);

  const categories = ['All Items', 'Medicines', 'IVF Kits', 'Surgical', 'Fluids', 'Consumables'];

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 no-scrollbar pb-40">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-3">
          <button onClick={onBack} className="text-[#0F766E] font-black text-[11px] uppercase tracking-[4px] flex items-center gap-2 hover:translate-x-[-5px] transition-all"><ChevronRight size={16} className="rotate-180" /> Hub Core</button>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none flex items-center gap-6"><div className="p-3.5 bg-[#0F766E] text-white rounded-[1.5rem] shadow-2xl"><Pill size={36} /></div>P10 <span className="text-[#0F766E]">Apothecary</span></h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search Inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-8 py-4 bg-white border border-slate-100 rounded-[2rem] text-sm w-80 shadow-2xl focus:ring-4 focus:ring-[#0F766E]/5 outline-none font-bold placeholder:text-slate-200 text-slate-900"
            />
          </div>
          <button className="p-4 bg-[#0F766E] text-white rounded-full shadow-lg shadow-teal-900/20 hover:scale-110 active:scale-95 transition-all">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKPI label="Total SKUs" value="2,482" icon={Package} trend="+12 New" color="slate" />
        <ModernKPI label="Expiring (30d)" value="18" icon={Clock} trend="Urgent" color="rose" critical />
        <ModernKPI label="Value Hub" value="₹42.8L" icon={DollarSign} trend="Monthly" color="slate" />
        <ModernKPI label="Stock Variance" value="0.4%" icon={Activity} trend="Healthy" color="slate" />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/20 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-[#0F766E] border border-teal-100 shadow-sm"><Archive size={24} /></div>
            <div>
              <h3 className="text-slate-900 font-black text-lg uppercase tracking-widest leading-none">Stock Ledger</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mt-1">Inventory Management Protocol</p>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${selectedFilter === cat ? 'bg-[#0F766E] text-white border-transparent shadow-lg shadow-teal-900/10' : 'bg-white text-slate-400 border-slate-100 hover:border-teal-200 hover:text-[#0F766E]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <table className="w-full text-slate-900">
            <thead>
              <tr className="text-slate-400 text-[9px] font-black uppercase tracking-[3px] border-b border-slate-50">
                <th className="px-6 py-6 text-left">Asset Details</th>
                <th className="px-6 py-6 text-center">Protocol Unit</th>
                <th className="px-6 py-6 text-center">Batch / Expiry</th>
                <th className="px-6 py-6 text-center">Quant Level</th>
                <th className="px-6 py-6 text-right pr-12">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStock.length > 0 ? (
                filteredStock.map((item) => (
                  <tr key={item.id} className="group hover:bg-teal-50/30 transition-all">
                    <td className="px-6 py-6">
                      <p className="text-slate-900 font-black text-base tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-bold text-[#0F766E] uppercase tracking-widest mt-1 opacity-70">{item.category}</p>
                    </td>
                    <td className="text-center">
                      <span className="px-4 py-1.5 bg-slate-50 rounded-lg text-slate-600 font-black text-[9px] uppercase tracking-widest border border-slate-100 group-hover:bg-white">{item.unit}</span>
                    </td>
                    <td className="text-center">
                      <p className="text-[11px] font-black text-slate-700 tracking-widest">{item.batch}</p>
                      <p className={`text-[9px] font-bold mt-1 ${item.expiry.includes('2025') ? 'text-rose-400' : 'text-slate-400'}`}>{item.expiry}</p>
                    </td>
                    <td className="text-center">
                      <div className="flex flex-col items-center">
                        <p className={`text-base font-black tracking-tighter ${item.stock <= 20 ? 'text-rose-500' : 'text-slate-900'}`}>{item.stock}</p>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' :
                            item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                          {item.status}
                        </span>
                      </div>
                    </td>
                    <td className="text-right pr-12">
                      <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl font-black text-[9px] uppercase tracking-widest text-slate-700 shadow-sm hover:bg-[#0F766E] hover:text-white hover:border-transparent transition-all">Restock</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <AlertCircle size={40} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-xs font-black uppercase tracking-[8px] text-slate-300">No Asset Matched</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// DOCTOR PROFILE VIEW (Individual Page)
function DoctorProfileView({ doctor, onBack }) {
  const [activeAction, setActiveAction] = useState(null); // 'schedule', 'consult', 'book'

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 pb-40 relative">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-white border border-slate-100 text-[#0F766E] rounded-2xl hover:bg-teal-50 transition-all shadow-sm">
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Back to Directory</p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Specialist Profile</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden p-3">
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-teal-50 shadow-inner">
              <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 text-center">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">{doctor.name}</h3>
              <p className="text-[#0F766E] font-bold text-sm uppercase tracking-widest bg-teal-50 rounded-xl py-2 mb-6">{doctor.role}</p>

              <div className="flex justify-center gap-6 pt-4 border-t border-slate-50">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-900">4.9/5</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Rating</span>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-900">{doctor.exp}</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Practice</span>
                </div>
                <div className="w-px h-8 bg-slate-100"></div>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-900">12k+</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Patients</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0F766E] p-8 rounded-[3rem] text-white shadow-xl shadow-teal-900/30 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[4px] opacity-60">Actions</h4>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveAction('schedule')} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex flex-col items-center gap-3 transition-all">
                <Calendar size={20} />
                <span className="text-[10px] font-black uppercase">Schedule</span>
              </button>
              <button onClick={() => setActiveAction('consult')} className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex flex-col items-center gap-3 transition-all">
                <MessageSquare size={20} />
                <span className="text-[10px] font-black uppercase">Consult</span>
              </button>
            </div>
            <button onClick={() => setActiveAction('book')} className="w-full py-5 bg-white text-[#0F766E] rounded-3xl font-black text-xs uppercase tracking-[4px] shadow-2xl hover:scale-[1.02] transition-all">Book Appointment</button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                <BadgeCheck size={20} className="text-[#0F766E]" />
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[4px]">Professional Summary</h4>
              </div>
              <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
                "{doctor.bio || 'Comprehensive specialist dedicated to clinical excellence and patient care in the Project 10 Healthcare Network.'}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <GraduationCap size={18} />
                  <h5 className="text-[10px] font-black uppercase tracking-[3px]">Academic Credentials</h5>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-sm font-black text-slate-800">{doctor.qual}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Medical Board Certified</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <Award size={18} />
                  <h5 className="text-[10px] font-black uppercase tracking-[3px]">Departmental Hub</h5>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-sm font-black text-slate-800">{doctor.dept}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Project 10 HQ Wing</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4 text-slate-400">
                <Workflow size={18} />
                <h5 className="text-[10px] font-black uppercase tracking-[3px]">Clinical Focus</h5>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Advanced Diagnostics', 'In-Patient Care', 'Surgical Precision', 'Patient Education', 'Tele-Consultation'].map((skill) => (
                  <span key={skill} className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-[4px] flex items-center gap-3">
                <Clock size={18} className="text-[#0F766E]" /> Availability Ledger
              </h4>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Updated 2m ago
              </span>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className={`p-4 rounded-2xl text-center flex flex-col gap-2 transition-all ${idx < 5 ? 'bg-teal-50 border border-teal-100' : 'bg-slate-50 border border-slate-100 opacity-40'}`}>
                  <span className="text-[9px] font-black text-slate-400 uppercase">{day}</span>
                  <span className="text-[11px] font-black text-[#0F766E]">{idx < 5 ? '9A-5P' : 'Closed'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeAction && (
        <ActionOverlay
          action={activeAction}
          doctor={doctor}
          onClose={() => setActiveAction(null)}
        />
      )}
    </div>
  );
}

// SHARED OVERLAY & ACTION COMPONENTS
function ActionOverlay({ action, doctor, onClose }) {
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'opacity-100 backdrop-blur-md bg-slate-900/40' : 'opacity-0'}`}>
      <div
        className={`bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-500 ease-out border border-slate-100 ${isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl text-white shadow-lg shadow-teal-900/10 ${action === 'book' ? 'bg-[#0F766E]' : action === 'consult' ? 'bg-[#A855F7]' : 'bg-slate-800'}`}>
              {action === 'book' ? <CalendarCheck size={20} /> : action === 'consult' ? <Video size={20} /> : <Calendar size={20} />}
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                {action === 'book' ? 'Confirm Appointment' : action === 'consult' ? 'Tele-Consultation' : 'Weekly Roster'}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mt-1">
                With {doctor.name}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="p-3 bg-white rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all text-slate-400 border border-slate-100 shadow-sm"><X size={20} /></button>
        </div>

        <div className="p-10 max-h-[70vh] overflow-y-auto no-scrollbar">
          {action === 'book' && <BookingFlow doctor={doctor} onClose={handleClose} />}
          {action === 'consult' && <ConsultFlow doctor={doctor} onClose={handleClose} />}
          {action === 'schedule' && <ScheduleView doctor={doctor} />}
        </div>
      </div>
    </div>
  );
}

function BookingFlow({ doctor, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const dates = [
    { day: 'Mon', date: '12', full: 'Oct 12' },
    { day: 'Tue', date: '13', full: 'Oct 13' },
    { day: 'Wed', date: '14', full: 'Oct 14' },
    { day: 'Thu', date: '15', full: 'Oct 15' },
    { day: 'Fri', date: '16', full: 'Oct 16' },
  ];

  const times = ['09:00 AM', '09:30 AM', '10:00 AM', '11:15 AM', '02:00 PM', '03:45 PM', '04:30 PM'];

  if (isConfirmed) {
    return (
      <div className="text-center py-10 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border-4 border-emerald-100 shadow-xl">
          <Check size={40} strokeWidth={4} />
        </div>
        <h4 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Booking Confirmed!</h4>
        <p className="text-slate-500 text-sm font-medium">Your appointment ID is <span className="font-bold text-slate-900">#P10-BK-9921</span></p>
        <div className="mt-8 bg-slate-50 p-6 rounded-3xl border border-slate-100 inline-block text-left min-w-[300px]">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200/50">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</span>
            <span className="text-sm font-bold text-slate-900">{selectedDate?.full}, 2024</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</span>
            <span className="text-sm font-bold text-slate-900">{selectedTime}</span>
          </div>
        </div>
        <div className="mt-10">
          <button onClick={onClose} className="px-10 py-4 bg-[#0F766E] text-white rounded-[2rem] font-black text-xs uppercase tracking-[4px] shadow-xl hover:bg-teal-950 transition-all">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[4px]">Step 1: Select Date</h4>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((d) => (
            <button
              key={d.date}
              onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
              className={`flex-1 min-w-[80px] p-4 rounded-3xl border transition-all flex flex-col items-center gap-1 ${selectedDate?.date === d.date ? 'bg-[#0F766E] text-white border-transparent shadow-xl shadow-teal-900/20' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-teal-200 hover:bg-white'}`}
            >
              <span className="text-[9px] font-black uppercase tracking-widest opacity-80">{d.day}</span>
              <span className="text-xl font-black">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[4px]">Step 2: Available Slots</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${selectedTime === t ? 'bg-[#0F766E] text-white border-transparent shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-6 border-t border-slate-50 flex justify-end">
        <button
          disabled={!selectedTime}
          onClick={() => setIsConfirmed(true)}
          className={`px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[6px] shadow-xl transition-all flex items-center gap-3 ${selectedTime ? 'bg-[#0F766E] text-white hover:bg-teal-950 hover:scale-[1.02]' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          Confirm Booking <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ConsultFlow({ doctor, onClose }) {
  const [status, setStatus] = useState('check'); // check, connecting, live

  if (status === 'live') {
    return (
      <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in zoom-in duration-500">
        <div className="w-full h-64 bg-slate-900 rounded-[2rem] flex items-center justify-center relative overflow-hidden shadow-2xl">
          <img src={doctor.img} alt="Doctor" className="w-full h-full object-cover opacity-50 blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black uppercase tracking-[4px] text-xs">Waiting for {doctor.name}...</p>
          </div>
        </div>
        <button onClick={onClose} className="px-8 py-3 bg-rose-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-rose-600 transition-all">End Session</button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-6">
        <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden relative">
          <User size={32} className="text-slate-400" />
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-lg">System Check</h4>
          <p className="text-slate-400 text-xs font-bold mt-1">Checking camera and microphone permissions...</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Video size={20} /></div>
            <span className="font-bold text-slate-700 text-sm">Camera Access</span>
          </div>
          <CheckCircle2 size={20} className="text-emerald-500" />
        </div>
        <div className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Mic size={20} /></div>
            <span className="font-bold text-slate-700 text-sm">Microphone</span>
          </div>
          <CheckCircle2 size={20} className="text-emerald-500" />
        </div>
        <div className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Wifi size={20} /></div>
            <span className="font-bold text-slate-700 text-sm">Connection</span>
          </div>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Excellent</span>
        </div>
      </div>

      <button
        onClick={() => setStatus('live')}
        className="w-full py-5 bg-[#A855F7] text-white rounded-[2rem] font-black text-xs uppercase tracking-[6px] shadow-xl shadow-purple-900/20 hover:bg-purple-800 transition-all flex items-center justify-center gap-3"
      >
        <Video size={18} /> Join Consultation Room
      </button>
    </div>
  );
}

function ScheduleView({ doctor }) {
  const days = [
    { name: 'Monday', hours: '09:00 AM - 05:00 PM', status: 'Open' },
    { name: 'Tuesday', hours: '09:00 AM - 05:00 PM', status: 'Open' },
    { name: 'Wednesday', hours: '09:00 AM - 02:00 PM', status: 'Half Day' },
    { name: 'Thursday', hours: '09:00 AM - 05:00 PM', status: 'Open' },
    { name: 'Friday', hours: '09:00 AM - 05:00 PM', status: 'Open' },
    { name: 'Saturday', hours: '10:00 AM - 01:00 PM', status: 'Weekend' },
    { name: 'Sunday', hours: 'Unavailable', status: 'Closed' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 flex items-start gap-4 mb-6">
        <Info size={20} className="text-[#0F766E] shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-[#0F766E] leading-relaxed">
          This represents standard operating hours. For urgent surgeries or emergency cases, Dr. {doctor.name.split(' ')[1]} may be unavailable during these slots. Please check real-time availability in the Booking tab.
        </p>
      </div>

      <div className="space-y-3">
        {days.map((day) => (
          <div key={day.name} className={`flex items-center justify-between p-4 rounded-2xl border ${day.status === 'Closed' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${day.status === 'Open' ? 'bg-emerald-500' : day.status === 'Closed' ? 'bg-rose-400' : 'bg-amber-400'}`}></div>
              <span className="font-black text-slate-700 text-xs uppercase tracking-widest">{day.name}</span>
            </div>
            <span className="text-xs font-bold text-slate-500">{day.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// DASHBOARD OVERVIEW
function DashboardOverview({ onSelectSegment, currentTime }) {
  const hours = currentTime.getHours();
  let greeting = 'Good Evening';
  let Icon = Moon;
  if (hours < 12) { greeting = 'Good Morning'; Icon = Sunrise; }
  else if (hours < 17) { greeting = 'Good Afternoon'; Icon = Sun; }

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 no-scrollbar pb-32">
      <div className="flex justify-between items-center bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#0F766E] rounded-lg text-white"><Icon size={18} /></div>
            <p className="text-[10px] font-black text-[#0F766E] uppercase tracking-[4px]">{greeting}, Admin</p>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-3">Project 10 <span className="text-[#0F766E]">Command Console</span></h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm"><Calendar size={12} className="text-[#0F766E]" /><span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm"><Timer size={12} className="text-[#0F766E]" /><span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-900 shadow-sm hover:shadow-md transition-all uppercase tracking-widest" onClick={() => onSelectSegment({ name: 'P10 Apothecary', parent: 'Supply Chain' })}>P10 Apothecary</button>
          <button className="px-6 py-3 bg-[#0F766E] text-white rounded-xl text-[10px] font-black shadow-lg shadow-teal-900/20 hover:bg-teal-950 transition-all uppercase tracking-widest" onClick={() => onSelectSegment({ name: 'New Patient Entry' })}>+ Enroll Identity</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <ModernKPI label="Bookings" value="248" icon={Calendar} trend="+12" color="slate" />
        <ModernKPI label="Registry" value="42" icon={UserPlus} trend="+8.4%" color="slate" />
        <ModernKPI label="Surgery" value="18" icon={Scissors} trend="6 Active" color="slate" />
        <ModernKPI label="Earnings" value="₹12.4L" icon={DollarSign} trend="+14%" color="slate" />
        <ModernKPI label="Med Cost" value="4.2%" icon={Pill} trend="Alert" color="rose" critical />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-wider text-[10px]"><Clock size={16} className="text-[#0F766E]" /> Recent Logins</h3>
            <div className="flex gap-2 items-center"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Live</span></div>
          </div>
          <div className="p-2">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-left font-black uppercase text-[9px] tracking-[2.5px]">
                  <th className="px-6 pb-4 pt-4">Identity Profile</th>
                  <th className="px-6 pb-4 pt-4 text-center">Protocol Unit</th>
                  <th className="px-6 pb-4 pt-4 text-center">Timestamp</th>
                  <th className="px-6 pb-4 pt-4 text-right pr-12">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <PatientRow name="Sarah Jenkins" mrn="P10-9921" dept="Elite IVF" time="10:15 AM" status="Consulting" />
                <PatientRow name="Mark Thompson" mrn="P10-9924" dept="Orthopedics" time="09:42 AM" status="Lab Check" />
                <PatientRow name="Emily Davis" mrn="P10-9928" dept="Gynaecology" time="09:15 AM" status="Admitted" />
                <PatientRow name="David Wilson" mrn="P10-9932" dept="Pediatrics" time="08:50 AM" status="Discharged" />
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between group">
          <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4"><h3 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-wider text-[10px]"><PieChart size={16} className="text-[#0F766E]" /> Distribution</h3><button className="text-[9px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">By Wing</button></div>
          <div className="flex-1 flex flex-col items-center justify-center space-y-10">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="3"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#0F766E" strokeWidth="4" strokeDasharray="35 65" strokeDashoffset="0"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#A855F7" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-35"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#E11D48" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-60"></circle>
                <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#059669" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-80"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col"><p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">842</p><p className="text-[8px] font-black text-slate-400 uppercase tracking-[2px] mt-1">Total</p></div>
            </div>
            <div className="w-full grid grid-cols-2 gap-3">
              <LegendItem label="IVF" percent="35%" />
              <LegendItem label="Ortho" percent="25%" />
              <LegendItem label="Peds" percent="20%" />
              <LegendItem label="Other" percent="20%" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
        <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
          <div className="flex items-center gap-4"><div className="p-3 bg-slate-50 rounded-2xl text-[#0F766E] shadow-sm"><Calendar size={20} /></div><div><h3 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-wider text-xs">Upcoming Appointments</h3><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Clinical Queue Matrix</p></div></div>
          <div className="flex gap-4">
            <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">Today</button>
            <button className="text-[10px] font-black text-slate-900 border-b-2 border-[#0F766E] pb-1 uppercase tracking-widest transition-colors">Tomorrow</button>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <UpcomingAppCard name="John Arackal" mrn="P10-9945" time="02:30 PM" dept="IVF Elite" dr="Dr. Sabine S" type="Follow-up" />
            <UpcomingAppCard name="Meera Nair" mrn="P10-9948" time="03:15 PM" dept="Pediatrics" dr="Dr. Ajayakumar J" type="Vaccination" />
            <UpcomingAppCard name="Robert Fox" mrn="P10-9952" time="04:00 PM" dept="Orthopedics" dr="Dr. Midhun Mohan" type="Consultation" />
            <UpcomingAppCard name="Ananya S" mrn="P10-9955" time="04:45 PM" dept="Gynaecology" dr="Dr. Anju Aravindan" type="Checkup" />
          </div>
        </div>
      </div>
    </div>
  );
}

// GENERIC SEGMENT DASHBOARD
function GenericSegmentDashboard({ segment, onBack }) {
  const seed = segment.name.length;
  const activeCount = 100 + (seed * 12);
  const pendingCount = 20 + (seed * 3);
  const efficiency = 85 + (seed % 15);

  return (
    <div className="p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-32">
      <div className="flex justify-between items-end">
        <div>
          <button onClick={onBack} className="text-[#0F766E] font-black text-[10px] uppercase tracking-[4px] flex items-center gap-2 hover:translate-x-[-5px] transition-all mb-3"><ChevronRight size={16} className="rotate-180" /> {segment.parent}</button>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{segment.name}</h2>
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-teal-50 text-[#0F766E] text-[10px] font-black uppercase tracking-widest rounded-lg border border-teal-100">Live Operation</span>
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">ID: {segment.name.substring(0, 3).toUpperCase()}-{seed}92</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0F766E] shadow-sm transition-all"><Settings size={20} /></button>
          <button className="p-3 bg-[#0F766E] text-white rounded-xl shadow-lg shadow-teal-900/20 hover:bg-teal-950 transition-all"><RefreshCw size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernKPI label="Total Active" value={activeCount} icon={Activity} trend="+4.2%" color="slate" />
        <ModernKPI label="Pending Tasks" value={pendingCount} icon={ListChecks} trend="-12%" color="slate" />
        <ModernKPI label="Efficiency" value={`${efficiency}%`} icon={Zap} trend="Optimal" color="slate" />
        <ModernKPI label="Alerts" value="0" icon={ShieldCheck} trend="Secure" color="slate" />
      </div>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <h3 className="font-black text-slate-900 flex items-center gap-3 uppercase tracking-wider text-[11px]"><FileText size={16} className="text-[#0F766E]" /> Recent {segment.name} Records</h3>
          <button className="text-[10px] font-black text-[#0F766E] uppercase tracking-widest hover:underline">View All Archive</button>
        </div>
        <div className="p-2">
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-left font-black uppercase text-[9px] tracking-[2.5px]">
                <th className="px-6 pb-4 pt-4">Record ID</th>
                <th className="px-6 pb-4 pt-4">Description</th>
                <th className="px-6 pb-4 pt-4 text-center">Status</th>
                <th className="px-6 pb-4 pt-4 text-center">Date</th>
                <th className="px-6 pb-4 pt-4 text-right pr-8">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4 font-black text-slate-900 text-[11px] tracking-widest">{segment.name.substring(0, 3).toUpperCase()}-2024-{100 + i}</td>
                  <td className="px-6 py-4 font-bold text-slate-500 text-[12px]">Standard Operation Protocol - Sequence {i}</td>
                  <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">Completed</span></td>
                  <td className="px-6 py-4 text-center text-[10px] font-bold text-slate-400">Oct {10 + i}, 2024</td>
                  <td className="px-6 py-4 text-right pr-8"><button className="text-[#0F766E] hover:text-teal-800"><MoreHorizontal size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// USER PROFILE VIEW
function UserProfileView({ onBack }) {
  return (
    <div className="p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <button onClick={onBack} className="text-[#0F766E] font-black text-[10px] uppercase tracking-[4px] flex items-center gap-2 hover:translate-x-[-5px] transition-all mb-3"><ChevronRight size={16} className="rotate-180" /> Back</button>
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-[#0F766E] to-teal-900 relative"><div className="absolute -bottom-16 left-12 w-32 h-32 rounded-[2rem] bg-white p-2 shadow-xl"><div className="w-full h-full bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-4xl font-black text-[#0F766E]">AD</div></div></div>
        <div className="pt-20 pb-12 px-12">
          <div className="flex justify-between items-start mb-8">
            <div><h2 className="text-3xl font-black text-slate-900 tracking-tight">Admin Director</h2><p className="text-[#0F766E] font-bold uppercase tracking-widest text-xs mt-1">Headquarters • Level 1 Access</p></div>
            <button className="px-6 py-3 bg-[#0F766E] text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-teal-900/20 hover:bg-teal-950 transition-all">Edit Profile</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[4px] border-b border-slate-50 pb-2">Credentials</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4"><Mail size={18} className="text-slate-300" /><span className="font-bold text-slate-700 text-sm">admin.hq@project10.com</span></div>
                <div className="flex items-center gap-4"><Phone size={18} className="text-slate-300" /><span className="font-bold text-slate-700 text-sm">+91 98765 43210</span></div>
                <div className="flex items-center gap-4"><MapPin size={18} className="text-slate-300" /><span className="font-bold text-slate-700 text-sm">Block A, Executive Wing</span></div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[4px] border-b border-slate-50 pb-2">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="flex items-center gap-3"><ShieldCheck size={18} className="text-emerald-500" /><span className="font-bold text-slate-700 text-xs uppercase tracking-wider">2FA Enabled</span></div><span className="text-[10px] font-black text-slate-400">Active</span></div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"><div className="flex items-center gap-3"><Key size={18} className="text-[#0F766E]" /><span className="font-bold text-slate-700 text-xs uppercase tracking-wider">Last Password Change</span></div><span className="text-[10px] font-black text-slate-400">30 Days ago</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// DOCTOR DIRECTORY VIEW
function DoctorDirectoryView({ onBack, onSelectDoctor }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const allDoctors = useMemo(() => DOCTOR_DATA.flatMap(group =>
    group.doctors.map(doc => ({ ...doc, dept: group.dept }))
  ), []);

  const departments = useMemo(() => {
    const depts = DOCTOR_DATA.map(d => ({
      name: d.dept,
      count: d.doctors.length
    }));
    return [{ name: 'All Departments', count: allDoctors.length }, ...depts];
  }, [allDoctors]);

  const filteredDoctors = allDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qual.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All Departments' || doc.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-12 max-w-screen-2xl mx-auto space-y-12 animate-in fade-in duration-1000 no-scrollbar pb-40">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-2">
          <button onClick={onBack} className="text-[#0F766E] font-black text-[10px] uppercase tracking-[4px] flex items-center gap-2 hover:translate-x-[-5px] transition-all mb-4"><ChevronRight size={16} className="rotate-180" /> Operational Hub</button>
          <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none flex items-center gap-6"><div className="p-3 bg-white text-[#0F766E] rounded-2xl shadow-xl border border-slate-100"><Stethoscope size={32} /></div>Specialist <span className="text-[#0F766E]">Directory</span></h2>
        </div>
        <div className="relative group z-20">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search Specialist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm w-full lg:w-[450px] shadow-2xl focus:ring-4 focus:ring-[#0F766E]/5 outline-none font-bold placeholder:text-slate-300 text-slate-900 transition-all"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-2">
          <Filter size={14} className="text-[#0F766E]" />
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Category Matrix</h4>
        </div>
        <div className="flex flex-wrap gap-3 overflow-x-auto no-scrollbar pb-2">
          {departments.map((dept) => (
            <button
              key={dept.name}
              onClick={() => setSelectedDept(dept.name)}
              className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border whitespace-nowrap flex items-center gap-3 ${selectedDept === dept.name ? 'bg-[#0F766E] text-white border-transparent shadow-lg shadow-teal-900/20' : 'bg-white text-slate-500 border-slate-100 hover:border-[#0F766E]/30 shadow-sm'}`}
            >
              {dept.name}
              <span className={`px-2 py-0.5 rounded-lg text-[9px] ${selectedDept === dept.name ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {dept.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] p-2 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col relative overflow-hidden">
              <div className="absolute top-8 right-8 z-20">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${doc.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                  {doc.status}
                </span>
              </div>

              <div className="p-8 pb-4 flex flex-col items-center text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-28 h-28 rounded-[3rem] overflow-hidden border-4 border-teal-50 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    {doc.img ? (
                      <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0F766E] to-teal-900 flex items-center justify-center text-white font-black text-3xl">
                        {doc.name.replace('Dr.', '').trim().split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <div className="w-full h-full bg-teal-50 rounded-full flex items-center justify-center text-[#0F766E]">
                      <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-2">{doc.name}</h3>
                <p className="text-[#0F766E] font-bold text-[11px] uppercase tracking-widest mb-4 px-4 bg-teal-50/50 rounded-lg py-1">{doc.role}</p>

                <div className="w-full pt-4 border-t border-slate-50 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-slate-500">
                    <GraduationCap size={15} className="text-slate-300" />
                    <span className="text-[11px] font-bold tracking-tight">{doc.qual}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-500">
                    <Building2 size={14} className="text-slate-300" />
                    <span className="text-[11px] font-medium tracking-tight">{doc.dept}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto bg-slate-50/50 rounded-[2.5rem] p-3">
                <div className="flex justify-between items-center bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm">
                  <div className="flex flex-col pl-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[2px]">Experience</span>
                    <span className="text-sm font-black text-slate-900">{doc.exp}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-2xl bg-teal-50 text-[#0F766E] flex items-center justify-center hover:bg-[#0F766E] hover:text-white transition-all shadow-sm">
                      <Calendar size={18} />
                    </button>
                    <button
                      onClick={() => onSelectDoctor(doc)}
                      className="w-10 h-10 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center shadow-lg shadow-teal-900/20 hover:scale-110 active:scale-95 transition-all"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-300">
            <Search size={60} className="mb-4 opacity-20" />
            <p className="text-xl font-black uppercase tracking-[10px]">No Specialists Found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// MODERN DUMMY ORGANOGRAM VIEW
function OrganogramView({ onBack }) {
  return (
    <div className="p-10 max-w-screen-2xl mx-auto space-y-12 animate-in fade-in duration-1000 no-scrollbar pb-40">
      <div className="flex justify-between items-center bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-teal-50 text-[#0F766E] rounded-2xl hover:bg-[#0F766E] hover:text-white transition-all border border-teal-100 shadow-sm"><ChevronRight size={18} className="rotate-180" /></button>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4 leading-none uppercase">Organizational <span className="text-[#0F766E]">Matrix</span></h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mt-1">Project 10 Operational Hierarchy</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-teal-600 transition-all">Print Map</button>
          <button className="px-6 py-3 bg-[#0F766E] text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-teal-900/20">Expand All</button>
        </div>
      </div>

      <div className="relative pt-12">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '1000px' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M 50% 50 L 50% 150" stroke="url(#lineGrad)" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          <path d="M 50% 230 L 50% 280" stroke="url(#lineGrad)" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          <path d="M 50% 360 C 50% 400, 15% 400, 15% 440" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
          <path d="M 50% 360 C 50% 400, 38% 400, 38% 440" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
          <path d="M 50% 360 C 50% 400, 62% 400, 62% 440" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
          <path d="M 50% 360 C 50% 400, 85% 400, 85% 440" stroke="url(#lineGrad)" strokeWidth="3" fill="none" />
        </svg>

        <div className="flex flex-col items-center gap-20">
          <ModernOrgCard label="Board of Directors" sub="Strategic Governance" icon={Landmark} type="governance" />
          <ModernOrgCard label="Chief Executive Officer" sub="Executive Leadership" icon={Medal} type="leadership" />
          <div className="grid grid-cols-4 gap-8 w-full">
            <ModernOrgCard label="CMO" sub="Medical Services" icon={Stethoscope} type="director" />
            <ModernOrgCard label="COO" sub="Hospital Operations" icon={Workflow} type="director" />
            <ModernOrgCard label="CFO" sub="Corporate Finance" icon={DollarSign} type="director" />
            <ModernOrgCard label="CIO" sub="Digital & Analytics" icon={Cpu} type="director" />
          </div>
          <div className="grid grid-cols-4 gap-8 w-full">
            <div className="flex flex-col gap-4">
              <ModernOrgCard label="Clinical Ops" sub="HOD Cluster" icon={Activity} type="unit" small />
              <ModernOrgCard label="Nursing" sub="Staff Matrix" icon={HeartPulse} type="unit" small />
            </div>
            <div className="flex flex-col gap-4">
              <ModernOrgCard label="Logistics" sub="Supply Chain" icon={Truck} type="unit" small />
              <ModernOrgCard label="Engineering" sub="Infrastructure" icon={Wrench} type="unit" small />
            </div>
            <div className="flex flex-col gap-4">
              <ModernOrgCard label="Billing" sub="Revenue Mgmt" icon={CreditCard} type="unit" small />
              <ModernOrgCard label="Purchasing" sub="Asset Acq" icon={Boxes} type="unit" small />
            </div>
            <div className="flex flex-col gap-4">
              <ModernOrgCard label="HIMS Team" sub="Tech Support" icon={Network} type="unit" small />
              <ModernOrgCard label="Data Security" sub="Cyber Compliance" icon={ShieldCheck} type="unit" small />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernOrgCard({ label, sub, icon: Icon, type, small }) {
  const styles = {
    governance: 'bg-amber-50 border-amber-200 text-amber-900 ring-4 ring-amber-50',
    leadership: 'bg-teal-50 border-teal-200 text-teal-900 ring-8 ring-teal-50/50',
    director: 'bg-white border-teal-100 shadow-xl text-slate-800',
    unit: 'bg-white/70 backdrop-blur-sm border-slate-100 shadow-sm text-slate-600 hover:shadow-lg hover:bg-white transition-all'
  };
  const iconColors = {
    governance: 'bg-amber-200 text-amber-700',
    leadership: 'bg-teal-600 text-white',
    director: 'bg-teal-50 text-teal-600',
    unit: 'bg-slate-100 text-slate-500'
  };
  return (
    <div className={`mx-auto flex flex-col items-center group cursor-pointer relative z-10 ${small ? 'w-full' : 'w-72'}`}>
      <div className={`w-full p-6 rounded-[2.5rem] border text-center relative overflow-hidden transition-all duration-500 ${styles[type]} ${small ? 'p-4 rounded-[1.5rem]' : ''}`}>
        <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 ${iconColors[type]} ${small ? 'w-10 h-10 mb-2 rounded-xl' : ''}`}>
          <Icon size={small ? 18 : 24} />
        </div>
        <h4 className={`font-black uppercase tracking-tight leading-none ${small ? 'text-[11px]' : 'text-[15px]'}`}>{label}</h4>
        <p className={`font-bold uppercase tracking-widest text-slate-400 mt-2 ${small ? 'text-[8px] mt-1' : 'text-[9px]'}`}>{sub}</p>
        {!small && <div className="absolute top-4 right-4 flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div></div>}
      </div>
    </div>
  );
}

function ModernKPI({ label, value, icon: Icon, trend, sub, color, critical }) {
  const accentColors = { slate: 'bg-slate-50 text-slate-900 border-slate-100', rose: 'bg-rose-50 text-rose-600 border-rose-100' };
  return (
    <div className={`bg-white p-6 rounded-3xl border ${critical ? 'border-rose-200' : 'border-slate-100'} shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden`}><div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 text-slate-900"><Icon size={80} /></div><div className="flex justify-between items-start mb-6 relative z-10"><div className={`p-2.5 rounded-xl border ${accentColors[color || 'slate']} shadow-sm`}><Icon size={18} /></div><span className={`text-[10px] font-black ${critical ? 'text-rose-500' : 'text-emerald-600'} uppercase tracking-widest`}>{trend}</span></div><div className="relative z-10"><p className="text-slate-400 text-[10px] font-black uppercase tracking-[3px] mb-1.5 leading-none">{label}</p><h4 className={`text-3xl font-black ${critical ? 'text-rose-600' : 'text-slate-900'} tracking-tighter mb-1.5 leading-none`}>{value}</h4><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-80">{sub || 'Telemetry Live'}</p></div></div>
  );
}

function PatientRow({ name, mrn, dept, status, time }) {
  return (
    <tr className="group hover:bg-slate-50 transition-all duration-300"><td className="px-6 py-5 font-black text-slate-900 text-[15px] tracking-tight">{name}<p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 opacity-70">{mrn}</p></td><td className="px-6 py-5 font-bold text-slate-500 text-[10px] uppercase tracking-widest text-center">{dept}</td><td className="px-6 py-5 font-bold text-slate-400 text-[10px] text-center"><div className="flex items-center justify-center gap-2"><Timer size={10} className="text-[#0F766E]/40" />{time}</div></td><td className="px-6 py-5 text-right pr-6"><span className="px-4 py-2 rounded-xl text-[8px] font-black uppercase border tracking-widest transition-all inline-block border-slate-100 bg-white text-slate-700 group-hover:bg-[#0F766E] group-hover:text-white group-hover:border-transparent shadow-sm">{status}</span></td></tr>
  );
}

function UpcomingAppCard({ name, mrn, time, dept, dr, type }) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative group/app"><div className="flex justify-between items-start mb-6"><div className="px-3 py-1.5 bg-[#0F766E] text-white text-[9px] font-black rounded-lg shadow-lg shadow-teal-900/20">{time}</div><button className="text-slate-200 hover:text-slate-900 transition-colors"><MoreHorizontal size={14} /></button></div><div className="space-y-1 mb-6"><h4 className="text-slate-900 font-black text-base tracking-tight">{name}</h4><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{mrn}</p></div><div className="space-y-3 pt-4 border-t border-slate-50"><div className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#0F766E]"></div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{dept}</p></div><div className="flex items-center gap-3"><Stethoscope size={12} className="text-slate-300" /><p className="text-[11px] font-black text-slate-700 tracking-tight">{dr}</p></div></div><div className="mt-6 flex justify-between items-center"><span className="text-[8px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-2 py-1 rounded-md">{type}</span><div className="w-2 h-2 rounded-full bg-emerald-500/20 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-emerald-500"></div></div></div></div>
  );
}

function LegendItem({ label, percent }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:shadow-sm transition-all cursor-default"><div className="flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full bg-[#0F766E]`}></div><span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{label}</span></div><span className="text-[10px] font-black text-slate-900">{percent}</span></div>
  );
}

function NewPatientForm({ onBack }) {
  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-32"><div className="flex justify-between items-center mb-10"><div className="space-y-2"><button onClick={onBack} className="text-[#0F766E] font-black text-[10px] uppercase tracking-[4px] flex items-center gap-3 hover:translate-x-[-5px] transition-all mb-4"><ChevronRight size={20} className="rotate-180" /> Operational Hub</button><h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-none flex items-center gap-6"><div className="p-3 bg-white text-[#0F766E] rounded-2xl shadow-xl border border-slate-100 shadow-slate-200/50"><UserPlus size={32} /></div>Identity <span className="text-[#0F766E]">Registration</span></h2></div></div><div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative"><div className="grid grid-cols-1 lg:grid-cols-4 relative z-10"><div className="p-12 border-r border-slate-50 bg-slate-50/30"><h3 className="text-[#0F766E] font-black text-xs uppercase tracking-[4px] mb-8 flex items-center gap-3"><Info size={16} className="text-[#A855F7]" /> Instruction</h3><div className="space-y-8"><InstructionBlock step="01" title="Validate Profile" desc="Match biometric and identity data." /><InstructionBlock step="02" title="Contact Sync" desc="Confirm notification numbers." /></div></div><div className="lg:col-span-3 p-12 space-y-12"><div className="space-y-8"><div className="flex items-center gap-4 border-b border-slate-50 pb-4"><Fingerprint size={18} className="text-[#0F766E]" /><h4 className="text-slate-400 font-black text-[10px] uppercase tracking-[4px]">Identity Matrix</h4></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><FormInput label="Full Legal Name" placeholder="First Last" icon={User} /><FormInput label="Date of Birth" placeholder="DD / MM / YYYY" icon={Calendar} /><FormInput label="Gender" type="select" options={['Male', 'Female', 'Other']} icon={Activity} /><FormInput label="Blood Group" type="select" options={['A+', 'B+', 'O+', 'AB+']} icon={Droplets} /></div></div><div className="pt-8 border-t border-slate-50 flex justify-end items-center gap-10"><button className="px-12 py-5 bg-[#0F766E] text-white rounded-[2rem] font-black text-xs uppercase tracking-[6px] shadow-2xl hover:bg-teal-950 transition-all flex items-center gap-4 group">Authorize Identity <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></button></div></div></div></div></div>
  );
}

function InstructionBlock({ step, title, desc }) {
  return (
    <div className="space-y-2"><div className="flex items-center gap-3"><span className="text-[10px] font-black text-white bg-[#0F766E] w-6 h-6 rounded-md flex items-center justify-center">{step}</span><p className="text-[#0F766E] font-black text-[10px] uppercase tracking-widest">{title}</p></div><p className="text-slate-400 text-[10px] font-medium leading-relaxed pl-9">{desc}</p></div>
  );
}

function FormInput({ label, placeholder, type = "text", options = [], icon: Icon }) {
  return (
    <div className="space-y-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] ml-1">{label}</label><div className="relative group">{Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0F766E] transition-colors" size={16} />}{type === "select" ? (<select className={`w-full ${Icon ? 'pl-14' : 'px-6'} pr-6 py-5 bg-white border border-slate-100 rounded-2xl text-sm font-black text-slate-900 focus:border-[#0F766E] transition-all outline-none appearance-none`}>{options.map(o => <option key={o}>{o}</option>)}</select>) : (<input className={`w-full ${Icon ? 'pl-14' : 'px-6'} pr-6 py-5 bg-white border border-slate-100 rounded-2xl text-sm font-black text-slate-900 focus:border-[#0F766E] transition-all outline-none placeholder:text-slate-200`} placeholder={placeholder} />)}{type === "select" && <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={16} />}</div></div>
  );
}

function LaboratoryDashboard({ segment, onBack }) {
  return (
    <div className="p-12 max-w-screen-2xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-40 no-scrollbar"><div className="flex justify-between items-center bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50"><div><button onClick={onBack} className="text-[#0F766E] font-black text-[11px] uppercase tracking-[6px] mb-3 flex items-center gap-2"><ChevronRight size={18} className="rotate-180" /> Hub</button><h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-6 leading-none"><div className="p-4 bg-white border border-slate-100 rounded-[2rem] text-[#0F766E] shadow-2xl"><FlaskConical size={32} /></div>{segment.name} <span className="text-slate-300 font-light tracking-normal opacity-40">/ HUB-01</span></h2></div></div><div className="grid grid-cols-1 md:grid-cols-4 gap-8"><PremiumLabCard label="Units" value="1,248" sub="Daily Intake" icon={TestTube} /><PremiumLabCard label="Active" value="142" sub="Urgent Triage" icon={Clock} /><PremiumLabCard label="Auth" value="89" sub="Pending Verify" icon={ClipboardCheck} /><PremiumLabCard label="TAT" value="94%" sub="Global Optimal" icon={TrendingUp} /></div></div>
  );
}

function PremiumLabCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:scale-[1.02] transition-all duration-700"><div className="p-4 rounded-2xl inline-block mb-10 shadow-inner bg-slate-50 text-[#0F766E] border border-slate-100 group-hover:rotate-6 transition-transform"><Icon size={24} /></div><p className="text-slate-400 text-[10px] font-black uppercase tracking-[6px] mb-2 leading-none">{label}</p><p className="text-5xl font-black text-slate-900 tracking-tighter mb-2 leading-none">{value}</p><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p></div>
  );
}

function PlaceholderContent({ tab }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-200"><div className="p-20 bg-white rounded-full border border-slate-100 mb-8 shadow-2xl relative"><ShieldCheck size={100} className="text-[#0F766E] opacity-20" /></div><h3 className="text-3xl font-black text-slate-900 uppercase tracking-[12px] mb-2 opacity-80 leading-none">ACTIVE</h3><p className="text-slate-400 font-black uppercase tracking-[5px] text-[10px]">Authorization Verified: {tab}</p></div>
  );
}