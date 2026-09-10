import axios from 'axios'

export function fetchPosters(jwt, caId) {
	return new Promise(async (resolve, reject) => {
		try {
			const postersRes = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posters?populate=image&pagination[page]=1&pagination[pageSize]=200`
			)

			const submissionRes = await axios.get(
				// `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cas/${caId}?populate[0]=submissions&populate[1]=submissions.image&populate[2]=submissions.poster&populate[3]=submissions.poster.image`,
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ca/submission?caId=${caId}`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			)

			console.log(submissionRes)

			const submissions = submissionRes?.data?.submission?.map((sub) => {
				const images = sub?.image?.map((img) => {
					return {
						id: img?.id,
						url: process.env.NEXT_PUBLIC_BACKEND_URL + img?.url,
					}
				})

				return {
					caId: caId,
					submissionId: sub?.id,
					posterId: sub?.poster?.id,
					posterTitle: sub?.poster?.title,
					posterImageUrl: process.env.NEXT_PUBLIC_BACKEND_URL + sub?.poster?.image?.url,
					hide: sub?.poster?.hide,
					registerLink: sub?.poster?.regLink,
					comment: sub?.comment,
					points: sub?.point,
					reason: sub?.reason,
					remarks: sub?.remarks,
					status: sub?.status,
					images,
				}
			})

			const posters = postersRes.data.data.map((poster) => {
				return {
					posterId: poster?.id,
					title: poster?.attributes?.title,
					description: poster?.attributes?.description,
					hide: poster?.attributes?.hide,
					registerLink: poster?.attributes?.regLink,
					image: `${process.env.NEXT_PUBLIC_BACKEND_URL}${poster?.attributes?.image?.data?.attributes?.url}`,
				}
			})

			posters?.reverse()
			submissions?.reverse()

			resolve({ posters: posters || [], submissions: submissions || [] })
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch posters'))
		}
	})
}

export function submitPoster(jwt, submission, comment, images, onNewImages, onProgress) {
	return new Promise(async (resolve, reject) => {
		try {
			const imageIds = []
			const imageFiles = []
			for (let img of images) {
				if (img?.id) imageIds.push(img?.id)
				else if (img?.type == 'file') imageFiles.push(img?.file)
			}

			if (imageFiles.length) {
				// Uploading images
				const formData = new FormData()
				for (let f of imageFiles) formData.append('files', f)
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
						onUploadProgress: (progressEvent) => {
							let percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
							onProgress(percent)
						},
					}
				)
				const newImages = []
				for (let d of data) {
					imageIds.push(d.id)
					newImages.push({ id: d.id, url: process.env.NEXT_PUBLIC_BACKEND_URL + d.url })
				}
				onNewImages(newImages)
			}

			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ca/putSubmission`,
				{
					caId: submission.caId,
					posterId: submission.posterId,
					images: imageIds,
					comment,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			)

			resolve()
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to submit poster'))
		}
	})
}
