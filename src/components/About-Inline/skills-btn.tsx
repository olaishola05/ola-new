import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

type SkillButtonProps = {
  skill: {
    name: string
    icon: string
    description: string
    experience: string
  }
}
export default function SkillButton({ skill }: SkillButtonProps) {
  const { name, icon, description, experience } = skill
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-2 bg-bg border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-textColor">
          <span className="font-medium text-Color">{name}</span>
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-textColor">{description}</p>
          <div className="pt-2 border-t border-gray-100">
            <h5 className="text-xs font-medium text-textColor mb-1">Experience</h5>
            <p className="text-sm">{experience}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}