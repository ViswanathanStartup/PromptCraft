const TemplateCardSkeleton = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 animate-pulse">
    <div className="mb-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
            <div className="w-24 h-5 bg-slate-700 rounded-full"></div>
            <div className="w-8 h-4 bg-slate-700 rounded"></div>
          </div>
          <div className="w-3/4 h-6 bg-slate-700 rounded mb-2"></div>
        </div>
        <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-4 bg-slate-700 rounded"></div>
        <div className="w-5/6 h-4 bg-slate-700 rounded"></div>
        <div className="w-4/6 h-4 bg-slate-700 rounded"></div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex-1 h-10 bg-slate-700 rounded-xl"></div>
      <div className="w-10 h-10 bg-slate-700 rounded-xl"></div>
      <div className="w-10 h-10 bg-slate-700 rounded-xl"></div>
    </div>
  </div>
);

const ListItemSkeleton = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 animate-pulse">
    <div className="flex items-start gap-4">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-32 h-5 bg-slate-700 rounded"></div>
          <div className="w-16 h-4 bg-slate-700 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-4 bg-slate-700 rounded"></div>
          <div className="w-4/5 h-4 bg-slate-700 rounded"></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
        <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <TemplateCardSkeleton key={i} />
    ))}
  </div>
);

const SkeletonList = ({ count = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <ListItemSkeleton key={i} />
    ))}
  </div>
);

export { TemplateCardSkeleton, ListItemSkeleton, SkeletonGrid, SkeletonList };
