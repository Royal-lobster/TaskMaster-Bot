import { AgentBuilder, type SamplingHandler } from "@iqai/adk";
import { getTelegramTools } from "./tools";

export const createNotifyAgent = async (samplingHandler: SamplingHandler) => {
	const tools = await getTelegramTools(samplingHandler);

	return AgentBuilder.create("reminder_notify_agent")
		.withModel("gemini-2.5-flash")
		.withTools(...tools)
		.build();
};
