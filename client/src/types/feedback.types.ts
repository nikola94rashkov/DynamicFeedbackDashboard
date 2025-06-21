import type { UserDocument } from './user.types';
// import { Optional } from '@/types/utils.ts'

export type Status = 'pending' | 'resolved' | 'closed';
export type Category = 'bug' | 'feature';
export type SortBy = 'name' | 'category' | 'status' | 'oldest' | 'newest';

export type Feedback = {
    _id?: string
    name: string
    content: string
    status: Status
    category: Category
    author?: UserDocument
}

export type FeedbackExtended = {
    createdAt?: Date
    updatedAt?: Date
} & Feedback

export type FeedbackList = {
    feedbacks: FeedbackExtended[]
    totalFeedbacks: number
    totalPages: number
    currentPage: number
}

export type FeedbackListPagination = Omit<FeedbackList, 'feedbacks' | 'totalFeedbacks'>

export type FeedbackResponse = {
    message: string
    feedback: FeedbackExtended
}

export type FeedbacksUpdate = {
  feedback: {
      status: Status
      content: Feedback['content']
  }
  _id: Feedback['_id']
}

export type FeedbackPagination = {
    page: number
    limit: number
}

export type FeedbackFilter = {
    category?: Category
    status?: Status
    sortBy?:SortBy
} & FeedbackPagination