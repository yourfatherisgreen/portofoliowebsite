"use server";

import { Resend } from "resend";
import { z } from "zod";
import { ContactEmail } from "./contact-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
	success?: boolean;
	error?: string;
	message?: string;
};

const contactSchema = z.object({
	name: z
		.string()
		.min(1, "Please enter your name")
		.max(100, "Name is too long"),
	email: z
		.string()
		.min(1, "Please enter your email")
		.email("Please enter a valid email address"),
	message: z
		.string()
		.min(1, "Please enter a message")
		.max(5000, "Message is too long"),
});

export async function submitContactForm(
	_prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	try {
		const raw = Object.fromEntries(formData.entries());
		const parsed = contactSchema.safeParse(raw);

		if (!parsed.success) {
			// Return the first validation error
			const firstError = parsed.error.issues[0];
			return {
				success: false,
				error: firstError?.message ?? "Invalid form data",
			};
		}

		const { name, email, message } = parsed.data;

		const { error } = await resend.emails.send({
			from: "Portfolio Contact <contact@muhammadazmi.my.id>",
			to: ["muhamadazmi1211@gmail.com"],
			subject: `New message from ${name}`,
			replyTo: email,
			react: ContactEmail({
				senderName: name,
				senderEmail: email,
				message,
			}),
		});

		if (error) {
			console.error("Resend error:", error);
			return {
				success: false,
				error: "Failed to send email. Please try again.",
			};
		}

		return {
			success: true,
			message: "Message sent! I'll get back to you soon.",
		};
	} catch (error) {
		console.error("Server action error:", error);
		return {
			success: false,
			error: "Something went wrong. Please try again.",
		};
	}
}