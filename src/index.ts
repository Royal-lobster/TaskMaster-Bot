import { createSamplingHandler } from "@iqai/adk";
import * as dotenv from "dotenv";
import { createNotifyAgent } from "./agents/notify-agent/agent";
import { createTaskMasterAgent } from "./agents/task-master-agent/agent";
import { ReminderNotificationService } from "./services/reminder-notification";

dotenv.config();

/**
 * Telegram Bot with AI Agent
 *
 * A Telegram bot powered by ADK that can engage with users in channels and direct messages.
 * Customize the persona and instructions below to create your own unique bot.
 */

async function main() {
	console.log("🤖 Initializing Telegram bot agent...");

	// Initialize agents
	const { sessionService, session, runner } = await createTaskMasterAgent();
	const { runner: notifyRunner } = await createNotifyAgent(
		createSamplingHandler(runner.ask),
	);

	console.log("✅ Telegram bot agent initialized successfully!");
	console.log("🚀 Bot is now running and ready to receive messages...");

	// Start the reminder notification service
	const reminderService = new ReminderNotificationService(
		session,
		sessionService,
		notifyRunner,
	);
	reminderService.start();

	// Handle graceful shutdown
	process.on("SIGINT", () => {
		console.log("\n👋 Shutting down Telegram bot gracefully...");
		reminderService.stop();
		process.exit(0);
	});

	// Keep the process alive
	setInterval(() => {
		// Just keep the process running
	}, 1000);
}

main().catch(console.error);
