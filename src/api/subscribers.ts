import { Subscriber } from "./types/subscribers/subscribers";
import api from "./client";
import { CreateSubscriberDto, UpdateSubscriberDto } from "./types/subscribers/create-subscribers.dto";

export const fetchSubscribers = () => api.get<Subscriber[]>('/subscribers');
export const fetchSubscriber = (id: string) => api.get<Subscriber>(`/subscribers/${id}`);
export const createSubscriber = (body: CreateSubscriberDto) => api.post<Subscriber>('/subscribers', body);
export const updateSubscriber = (id: string, body: UpdateSubscriberDto) => api.patch<Subscriber>(`/subscribers/${id}`, body);
export const deleteSubscriber = (id: string) => api.delete(`/subscribers/${id}`);