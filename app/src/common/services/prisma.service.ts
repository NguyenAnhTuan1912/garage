import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";

// Import custom client
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({
      adapter,
      // log: [
      //   { emit: "event", level: "query" },
      //   { emit: "event", level: "error" },
      //   { emit: "event", level: "warn" },
      // ],
    });

    // (this as any).$on("query", (e: any) => {
    //   console.log("SQL:", e.query);
    //   console.log("Params:", e.params);
    // });

    // (this as any).$on("error", (e: any) => {
    //   console.log("PRISMA ERROR:", e);
    // });
  }

  /**
   * [Where builder] only select record that deletedAt = null.
   * @param where
   */
  public excludeDeleted(where: any) {
    where["deletedAt"] = null;
  }
}
