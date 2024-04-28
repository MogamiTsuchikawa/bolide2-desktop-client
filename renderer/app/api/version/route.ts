import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  return NextResponse.json({
    version: process.env.npm_package_version,
  });
};
