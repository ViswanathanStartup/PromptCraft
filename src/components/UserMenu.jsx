import { User, LogOut, Crown, Settings } from 'lucide-react';

const UserMenu = ({ user, onLogout }) => {
  const getTierColor = (tier) => {
    switch (tier) {
      case 'PRO':
        return 'text-purple-400';
      case 'ENTERPRISE':
        return 'text-yellow-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
        <User className="w-5 h-5 text-white" />
        <span className="text-white font-medium hidden sm:inline">{user.email}</span>
        <Crown className={`w-4 h-4 ${getTierColor(user.subscriptionTier)}`} />
      </button>

      <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-4 border-b border-white/10">
          <p className="text-white font-semibold">{user.email}</p>
          <p className={`text-sm ${getTierColor(user.subscriptionTier)} flex items-center gap-1 mt-1`}>
            <Crown className="w-3 h-3" />
            {user.subscriptionTier} Plan
          </p>
        </div>

        <div className="p-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            Account Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Crown className="w-4 h-4" />
            Upgrade Plan
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
