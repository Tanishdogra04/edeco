import { 
  Building2, Briefcase, Award, CheckCircle, 
  Globe, Users, FileText 
} from 'lucide-react';

const iconMapping = {
  Building2: Building2,
  Briefcase: Briefcase,
  Award: Award,
  CheckCircle: CheckCircle,
  Globe: Globe,
  Users: Users,
  FileText: FileText
};

export default function CollegeFacilities({ college }) {
  if (!college || !college.facilities) return null;

  return (
    <div id="section-facilities" className="scroll-mt-36">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
        <Building2 className="text-[#0f71cd]" /> Campus Facilities
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {college.facilities.map((fac, i) => {
          const Icon = iconMapping[fac.iconName] || Building2;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-[#0f71cd]/30 hover:shadow-md transition-all group cursor-default">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 text-slate-400 group-hover:text-[#0f71cd] group-hover:bg-[#0f71cd]/5 flex items-center justify-center mb-3 transition-all duration-300 shadow-sm">
                <Icon size={24} className="group-hover:scale-125 group-hover:stroke-[2.5px] transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-slate-600 text-sm group-hover:font-black group-hover:text-slate-900 transition-all">{fac.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
