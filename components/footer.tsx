export function Footer() {
  return (
    <footer className="bg-[#0f0a04] py-10">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-serif text-lg font-bold text-amber-500">
          Better Life Landscaping LLC
        </p>
        <p className="mt-2 text-sm text-white/50">
          {`\u00A9 ${new Date().getFullYear()} Better Life Landscaping LLC. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
