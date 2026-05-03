import { Injectable } from "@nestjs/common";
import { createHash, timingSafeEqual } from "crypto";
import bcrypt from "bcrypt";

@Injectable()
export class KeyHasherService {
  private readonly ALGORITHM = "sha256";

  /**
   * Hash a plain key.
   * @param plain 
   * @returns 
   */
  hash(plain: string): string {
    return createHash(this.ALGORITHM).update(plain).digest("hex");
  }

  /**
   * Compare plain key and hashed key.
   * @param plain 
   * @param hashedRecord 
   * @returns 
   */
  compare(plain: string, hashedRecord: string): boolean {
    const hashedInput = this.hash(plain);

    // Sử dụng Buffer để so sánh an toàn thời gian
    const inputBuffer = Buffer.from(hashedInput);
    const recordBuffer = Buffer.from(hashedRecord);

    if (inputBuffer.length !== recordBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, recordBuffer);
  }
}

@Injectable()
export class HashService {
  private readonly ROUND = 12;

  /**
   * Hash a plain key.
   * @param plain 
   * @returns 
   */
  hash(plain: string) {
    const salt = bcrypt.genSaltSync(this.ROUND);
    return bcrypt.hashSync(plain, salt);
  }

  /**
   * Compare plain key and hashed key.
   * @param plain 
   * @param hashedRecord 
   * @returns 
   */
  compare(plain: string, hashed: string) {
    return bcrypt.compareSync(plain, hashed);
  }
}