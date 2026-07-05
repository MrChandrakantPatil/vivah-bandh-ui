import { CircleArrowUp } from "lucide-react";

export function Card({
    title,
    count,
    growth,
    icon,
    iconBg,
    iconColor,
    growthColor
}) {
    const Icon = icon;

    return (
        <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-start gap-2">
                <div
                    className={`
                        flex justify-center items-center 
                        p-2 rounded-full 
                        ${iconBg}
                    `}
                >
                    <Icon 
                        size={24} 
                        className={`${iconColor}`} 
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-gray-700 font-semibold text-xs">
                        {title}
                    </p>

                    <h4 className="font-bold text-3xl text-gray-800">
                        {count}
                    </h4>

                    <p className={`flex items-center gap-1 ${growthColor} text-xs font-medium mt-1 truncate`}>
                        <CircleArrowUp size={14} /> {growth} this week
                    </p>
                </div>
            </div>
        </div>
    );
}