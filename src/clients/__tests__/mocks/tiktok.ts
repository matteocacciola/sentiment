export const mockedVideos = {
  videos: [
    {
      hashtag_names: [
        'avengers',
        'pov',
      ],
      region_code: 'CA',
      create_time: 1633823999,
      effect_ids: [ '0' ],
      video_id: 702874395068494965,
      music_id: 703847506349838790,
      video_description: 'lol #pov #avengers',
      view_count: 1050,
      comment_count: 2,
    },
  ],
  cursor: 100,
  search_id: '7201388525814961198',
  has_more: true,
};

export const mockedVideosCaptions = mockedVideos.videos.map(
  // @ts-ignore
  (video) => `${video.video_description} ${video.voice_to_text ?? ''}`.trim(),
);
export const mockedEmptyVideosCaptions: string[] = [];
