export default function SummaryCard({
    title,
    value,
    icon,
}) {
    return (
        <div
            className="
                bg-white
                rounded-2xl
                shadow-md
                p-6
                border
                border-slate-200
            "
        >
            <div className="flex justify-between items-center">

                <div>

                    <p className="text-slate-500 text-sm">
                        {title}
                        
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>

                </div>

                <div className="text-5xl">
                    {icon}
                </div>

            </div>
        </div>
    );
}