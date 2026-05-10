const Loading = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-3">
        
        {/* spinner */}
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />

        <p className="text-slate-500 text-sm">{text}</p>

      </div>
    </div>
  );
};

export default Loading;