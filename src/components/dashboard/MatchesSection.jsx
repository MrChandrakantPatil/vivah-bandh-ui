import priya from "../../assets/priya.png";
import { CircleCheck, Heart } from "lucide-react";

export function MatchesSection() {
    const matches = [
        {
            id: 1,
            name: "Priya",
            image: priya,
            age: "26",
            profession: "Software Engineer",
            address: "Bengluru, Karnataka",
            matchPercentage: "92%"
        },
        {
            id: 2,
            name: "Sneha",
            image: priya,
            age: "24",
            profession: "Product Manager",
            address: "Pune, Maharashtra",
            matchPercentage: "89%"
        },
        {
            id: 3,
            name: "Kamal",
            image: priya,
            age: "30",
            profession: "Software Engineer",
            address: "Mumbai, Maharashtra",
            matchPercentage: "85%"
        },
        {
            id: 4,
            name: "Pooja",
            image: priya,
            age: "32",
            profession: "Marketing Manager",
            address: "Bengluru, Karnataka",
            matchPercentage: "92%"
        }
    ]
    return (
        <div className="p-6 shadow border border-gray-100 rounded-lg text-gray-600">
            <div className="flex justify-between">
                <h4 className="font-bold text-md">
                    Recommended Matches for You
                </h4>

                <button className="text-[#e63b66] font-semibold text-xs" >
                    View All
                </button>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-4">
                {matches.map((profile) => (
                    <div 
                        key={profile.id}
                        className="shadow rounded-md overflow-hidden"
                    >
                        <div className="relative">
                            <img
                                src={profile.image}
                                alt="Profile"
                                className="object-cover object-top"
                            />

                            <span className="absolute top-1.5 right-1.5 px-2 py-0.5 bg-[#ea416f] rounded-md font-bold text-white text-xs">
                                New
                            </span>

                            <span className="absolute bottom-2 right-2.5 p-2 bg-white rounded-full">
                                <Heart size={16} className="text-[#eb849f] fill-[#eb849f]" />
                            </span>
                        </div>

                        <div className="p-3">
                            <h5 className="flex items-center gap-2 font-semibold text-sm">
                                {profile.name}, {profile.age} 
                                
                                <span className="flex justify-center items-center w-4 h-4 bg-green-500 rounded-full">
                                    <CircleCheck size={15} className="font-bold text-white" />
                                </span>
                            </h5>

                            <p className="mt-2 text-gray-500 text-xs">
                                {profile.profession}
                            </p>

                            <p className="my-2 text-gray-500 text-xs">
                                {profile.address}
                            </p>

                            <span className="px-3 py-1 bg-[#fdf0f3] rounded-md text-[#e63b66] font-bold text-xs">
                                {profile.matchPercentage} Match
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}