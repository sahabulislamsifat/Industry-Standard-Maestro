/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../errorHelper/AppError";

export interface IInvoiceData {
  transactionId: string;
  bookingDate: Date;
  userName: string;
  userEmail: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generatePdf = async (
  invoiceData: IInvoiceData
): Promise<Buffer> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffer: Uint8Array[] = [];

      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // ---- HEADER ----
      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("INVOICE", { align: "center" });
      doc.moveDown(1);

      // ---- CUSTOMER & BOOKING INFO ----
      doc.fontSize(12).font("Helvetica");
      doc.text(`Transaction ID: ${invoiceData.transactionId}`);
      doc.text(`Booking Date: ${invoiceData.bookingDate.toDateString()}`);
      doc.text(`Customer: ${invoiceData.userName}`);
      doc.moveDown(1);

      // ---- TOUR DETAILS ----
      doc.font("Helvetica-Bold").text("Booking Details", { underline: true });
      doc.moveDown(0.5);

      doc.font("Helvetica").text(`Tour Title: ${invoiceData.tourTitle}`);
      doc.text(`Guest Count: ${invoiceData.guestCount}`);
      doc.text(`Total Amount: $${invoiceData.totalAmount.toFixed(2)}`);
      doc.moveDown(1);

      // ---- FOOTER ----
      doc.moveDown(2);
      doc
        .fontSize(12)
        .font("Helvetica-Oblique")
        .text("Thank you for booking with us!", { align: "center" });

      doc.end();
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    throw new AppError(500, `PDF creation failed: ${error.message}`);
  }
};
