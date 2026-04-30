import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";

// Import custom client
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }

  /**
   * [Where builder] only select record that deletedAt = null.
   * @param where 
   */
  public excludeDeleted(where: any) {
    where["deletedAt"] = null;
  };
}
