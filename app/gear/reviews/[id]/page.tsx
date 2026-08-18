import Link from "next/link";
import { ArrowLeft, Package, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { averageRating, StarRating } from "@/components/review-details-page";
import { getReviews } from "@/service/review";
import { getGearItemById } from "@/service/gearItem";
import { ReviewsPage } from "@/components/review-details";
import { getUser } from "@/service/getMe";

// export default async function GearReviewsPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const gearReviews = await getReviews(id);
//   const gear = gearReviews[0];
//   const gearData = await getGearItemById(id);

//   if (gearReviews.length === 0) {
//     return (
//       <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//         <div className="mx-auto flex max-w-4xl flex-col gap-6 py-10">
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-sm font-medium text-primary hover:text-grey-700"
//           >
//             <ArrowLeft className="size-4" /> Back to reviews
//           </Link>
//           <Card>
//             <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
//               <Package className="size-12 text-slate-300" />
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Reviews not found
//               </h1>
//               <p className="text-slate-600">
//                 There are no reviews for gear ID {id}.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//     );
//   }

//   const rating = averageRating(gearReviews);

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//       <div className="mx-auto flex max-w-5xl flex-col gap-8 py-4">
//         <Link
//           href="/"
//           className="flex items-center gap-2 text-sm font-medium text-primary hover:text-grey-700"
//         >
//           <ArrowLeft className="size-4" /> Back to all reviews
//         </Link>
//         <header className="flex flex-col gap-3">
//           <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
//             Gear reviews
//           </p>
//           <h1 className="text-4xl font-bold tracking-tight text-slate-900">
//             {gearData.name}
//           </h1>
//           <p className="text-lg text-slate-600">
//             {/* {gear.providerName} <span className="text-slate-400">·</span>{" "} */}
//             {gearData.id}
//           </p>
//         </header>
//         <section className="grid gap-4 sm:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardDescription>Average rating</CardDescription>
//               <CardTitle className="flex items-center gap-2 text-3xl">
//                 {rating.toFixed(1)}{" "}
//                 <Star className="size-6 fill-amber-400 text-amber-400" />
//               </CardTitle>
//             </CardHeader>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardDescription>Total reviews</CardDescription>
//               <CardTitle className="text-3xl">{gearReviews.length}</CardTitle>
//             </CardHeader>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardDescription>Provider</CardDescription>
//               <CardTitle className="truncate text-xl">
//                 {gear.providerName}
//               </CardTitle>
//             </CardHeader>
//           </Card>
//         </section>
//         <Card>
//           <CardHeader>
//             <CardTitle>Customer feedback</CardTitle>
//             <CardDescription>
//               Reviews submitted for {gear.gearName}.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-4">
//             {gearReviews.map((review) => (
//               <article
//                 key={review.id}
//                 className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 md:flex-row md:justify-between"
//               >
//                 <div className="flex min-w-0 flex-col gap-3">
//                   <div className="flex flex-wrap items-center gap-3">
//                     <h2 className="font-semibold text-slate-900">
//                       {review.reviewerName}
//                     </h2>
//                     <span className="text-sm text-slate-500">
//                       {review.date}
//                     </span>
//                   </div>
//                   <p className="text-sm leading-6 text-slate-600">
//                     {review.description}
//                   </p>
//                 </div>
//                 <div className="shrink-0">
//                   <StarRating value={review.rating} />
//                 </div>
//               </article>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }

export default async function GearReviewsPage({ params }) {
  const { id } = await params;
  const gearReviews = await getReviews(id);
  const gearData = await getGearItemById(id);

  // const  = await getUser();

  console.log(gearReviews.data);
  console.log(gearData.data);
  return (
    <ReviewsPage gears={gearData.data} review={gearReviews.data}></ReviewsPage>
  );
}
