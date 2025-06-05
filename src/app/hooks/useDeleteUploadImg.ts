"use client";

export const useDeleteUploadImg = async (publicId: string) => {
  try {
    const response = await fetch(`/api/v1/delete-image`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
    return response;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
