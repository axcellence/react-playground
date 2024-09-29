import React from "react";

type SkeletonProps = {
  children: React.ReactNode
}

export function Skeleton({ children }: SkeletonProps) {
  return (<div className="max-w-lg [&_:is(h1,h2,h3,h4,h5,h6,p,span,li,img)]:shimmer [&_:is(h1,h2,h3,h4,h5,h6,p,span,li,img)]:inline [&_:is(h1,h2,h3,h4,h5,h6,p,span,li,img):before]:content-[''] [&_:is(h1,h2,h3,h4,h5,h6,p,span,li,img):before]:block [&_:is(h1,h2,h3,h4,h5,h6,p,span,li,img):before]:h-4">

    {children}
  </div>);
}
