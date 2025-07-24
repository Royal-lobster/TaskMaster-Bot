import { AgentBuilder, type SamplingHandler } from "@iqai/adk";
import { getTelegramTools } from "./tools";

export const createTelegramAgent = async (samplingHandler: SamplingHandler) => {
	const tools = await getTelegramTools(samplingHandler);

	return AgentBuilder.create("telegram_agent")
		.withModel("gemini-2.5-flash")
		.withTools(...tools)
		.build();
};
