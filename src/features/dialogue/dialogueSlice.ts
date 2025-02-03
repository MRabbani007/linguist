import { apiSlice } from "../api/apiSlice";

export const dialogueSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDialogues: builder.query<QueryResponse<Dialogue>, number>({
      query: (page) => ({
        url: "/admin/dialogue",
        method: "GET",
        params: { page },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result?.data.map(({ id }) => ({
                type: "Dialogue" as const,
                id,
              })), // Provide tags for each todo
              { type: "Dialogue", id: "DIALOGUELIST" }, // A special tag to track the entire list
            ]
          : [{ type: "Dialogue", id: "DIALOGUELIST" }],
    }),
    addDialogue: builder.mutation({
      query: (dialogue) => ({
        url: "/admin/dialogue",
        method: "POST",
        body: { dialogue },
      }),
      invalidatesTags: [{ type: "Dialogue", id: "DIALOGUELIST" }],
    }),
    editDialogue: builder.mutation({
      query: (dialogue) => ({
        url: "/admin/dialogue",
        method: "PATCH",
        body: { dialogue },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Dialogue", id }],
    }),
    removeDialogue: builder.mutation({
      query: (id) => ({
        url: "/admin/dialogue",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Dialogue", id: arg.id },
      ],
    }),
    getAdminDialogueByID: builder.query<DialogueByID, string>({
      query: (id) => ({
        url: `/dialogues/id`,
        method: "get",
        params: { id },
      }),
    }),
  }),
});

export const {
  useLazyGetAdminDialoguesQuery,
  useAddDialogueMutation,
  useEditDialogueMutation,
  useRemoveDialogueMutation,
  useLazyGetAdminDialogueByIDQuery,
} = dialogueSlice;
